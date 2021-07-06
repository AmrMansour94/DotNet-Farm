using ChicksApp.Context;
using ChicksApp.Domain;
using ChicksApp.VM;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ChicksApp.Controllers
{
    public class WardsController : ApiController
    {
        private readonly DataContext _context;

        public WardsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<KeyValuePairsVM> GetWards ()
        {
            var Wards = _context.Wards.Select(x=> new KeyValuePairsVM { ID = x.ID , Name = x.Name}).ToList();
            return Wards;
        }

        [HttpGet]
        public int Login(string userName , string password)
        {
            var user = _context.Users.Where(x=> x.UserName == userName && x.Password == password).FirstOrDefault();
            if (user != null)
                return user.ID;
            else return 0;
        }
    }
}
