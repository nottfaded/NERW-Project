using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Language
    {
        public int Id { get; protected set; }
        public string Name { get; protected set; } = string.Empty;

        [JsonIgnore]
        public List<PsychologistInfo> PsychologistsInfo { get; set; } = null!;
    }
}
