using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Education
    {
        [JsonIgnore] public int Id { get; protected set; }
        [JsonIgnore] public int PsychId { get; set; }
        public string University { get; set; } = string.Empty;
        public string Faculty { get; set; } = string.Empty;
        public int? Year { get; set; }


        [JsonIgnore] public PsychologistInfo Psych { get; set; } = null!;
    }
}
