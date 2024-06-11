using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogDataLibrary.Models
{
    public class PostModel
    {
        public int ID { get; set; }

        public string UserID { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string DateCreated{ get; set; }
    }
}
