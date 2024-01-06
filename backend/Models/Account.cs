using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace backend.Models
{
    public enum Role {Клієнт = 1, Психолог }
    public class Account
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("fk_role")]
        [ForeignKey("account_role_fk")]
        public Role Role { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("password")]
        public string Password { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("repairCode")]
        public string? RepairCode { get; set; }
        [Column("createdCode")]
        public DateTime CreatedCode { get; set; }
    }
}
