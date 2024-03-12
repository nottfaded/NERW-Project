using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Specialization
    {
        public int Id { get; protected set; }
        public string Type { get; protected set; } = string.Empty;


        [JsonIgnore]
        public List<PsychologistInfo> PsychologistsInfo { get; set; } = null!;
    }
}
