using JikanDotNet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Modules.Jikan
{
    [Route("api/[controller]")]
    [ApiController]
    public class JikanController(IJikan _jikan) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string category = "most-popular", [FromQuery] int page = 1)
        {
            var result = await _jikan.GetTopAnimeAsync(TopAnimeFilter.ByPopularity, page);
            return Ok(result);
        }
    }
}
