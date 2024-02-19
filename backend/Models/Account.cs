using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace backend.Models
{
    public enum Role { Client = 1, Psychologist }
    public class Account
    {
        [Key]
        public int Id { get; set; }
        [Column("fk_role")]
        [ForeignKey("account_role_fk")]
        public Role Role { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string? Surname { get; set; }
        public string Phone { get; set; } = string.Empty;
        public string? RepairCode { get; set; }
        public DateTime CreatedCode { get; set; }
        public List<NotifySetting> NotifySettings { get; set; } = new();
    }

    public class NotifySetting
    {
        public string Name { get; set; }
        public bool Mail { get; set; } = false;
        public bool Telegram { get; set; } = false;
        public bool Site { get; set; } = false;
    }
}
