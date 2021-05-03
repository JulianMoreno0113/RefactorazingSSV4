using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using SSV4.Models;
using System.Web.Http.Cors;

namespace SSV4.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PeriodoesController : ApiController
    {
        private Model1Container db = new Model1Container();

        // GET: api/Periodoes
        public IQueryable<Periodo> GetPeriodo()
        {
            return db.Periodo;
        }

        // GET: api/Periodoes/5
        [ResponseType(typeof(Periodo))]
        public IHttpActionResult GetPeriodo(int id)
        {
            Periodo periodo = db.Periodo.Find(id);
            if (periodo == null)
            {
                return NotFound();
            }

            return Ok(periodo);
        }

        // PUT: api/Periodoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPeriodo(int id, Periodo periodo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != periodo.Id)
            {
                return BadRequest();
            }

            db.Entry(periodo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PeriodoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Periodoes
        [ResponseType(typeof(Periodo))]
        public IHttpActionResult PostPeriodo(Periodo periodo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Periodo.Add(periodo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = periodo.Id }, periodo);
        }

        // DELETE: api/Periodoes/5
        [ResponseType(typeof(Periodo))]
        public IHttpActionResult DeletePeriodo(int id)
        {
            Periodo periodo = db.Periodo.Find(id);
            if (periodo == null)
            {
                return NotFound();
            }

            db.Periodo.Remove(periodo);
            db.SaveChanges();

            return Ok(periodo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PeriodoExists(int id)
        {
            return db.Periodo.Count(e => e.Id == id) > 0;
        }
    }
}