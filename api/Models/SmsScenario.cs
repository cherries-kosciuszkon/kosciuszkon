namespace api.Models;

public class SmsScenario
{
    public string Id { get; set; } = string.Empty;
    public string Sender { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public bool IsScam { get; set; }
    public string Explanation { get; set; } = string.Empty;
}
