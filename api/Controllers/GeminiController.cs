using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Google.GenAI;
using Google.GenAI.Types;

namespace api.Controllers
{
    
    namespace api.Controllers
    {
        [ApiController]
        [Route("api/chat")]
        public class GeminiController : ControllerBase
        {
            private readonly Client _geminiClient;

            public GeminiController(Client geminiClient)
            {
                _geminiClient = geminiClient;
            }

            [HttpPost("ask")]
            public async Task<IActionResult> Ask([FromBody] AskRequest request)
            {
                try
                {
                    string fullPrompt = string.Join("\n", PromptsList.Prompts[0]) + "\n" + request.Prompt;

                    var response = await _geminiClient.Models.GenerateContentAsync(
                        model: "models/gemini-3.1-flash-lite",
                        contents: fullPrompt
                    );
                    var result = response.Candidates?[0]?.Content?.Parts?[0]?.Text;

                    return Ok(new { answer = result });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { error = ex.Message });
                }
            }
        }
    }
}
