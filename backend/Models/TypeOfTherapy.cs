using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class TypeOfTherapy
    {
         public int Id { get; set; }
         public string Name { get; set; } = string.Empty;

        [JsonIgnore] public List<PsychologistInfo> PsychologistInfos { get; set; } = null!;
    }
}
