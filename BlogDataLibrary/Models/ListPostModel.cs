using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogDataLibrary.Models
{
    public class ListPostModel
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string DateCreated { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
 
    }
}
