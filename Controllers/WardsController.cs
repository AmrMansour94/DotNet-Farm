using ChicksApp.Context;
using ChicksApp.Domain;
using ChicksApp.VM;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ChicksApp.Controllers
{
    //[System.Web.Http.RoutePrefix("api/wards")]
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
    }
}
