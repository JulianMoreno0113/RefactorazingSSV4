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
    public class NotasMateriasController : ApiController
    {
        private Model1Container db = new Model1Container();

        // GET: api/NotasMaterias
        public IQueryable<NotasMateria> GetNotasMateria()
        {
            return db.NotasMateria;
        }

        // GET: api/NotasMaterias/5
        [ResponseType(typeof(NotasMateria))]
        public IHttpActionResult GetNotasMateria(int id)
        {
            NotasMateria notasMateria = db.NotasMateria.Find(id);
            if (notasMateria == null)
            {
                return NotFound();
            }

            return Ok(notasMateria);
        }

        // PUT: api/NotasMaterias/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNotasMateria(int id, NotasMateria notasMateria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != notasMateria.Id)
            {
                return BadRequest();
            }

            db.Entry(notasMateria).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotasMateriaExists(id))
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

        // POST: api/NotasMaterias
        [ResponseType(typeof(NotasMateria))]
        public IHttpActionResult PostNotasMateria(NotasMateria notasMateria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.NotasMateria.Add(notasMateria);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = notasMateria.Id }, notasMateria);
        }

        // DELETE: api/NotasMaterias/5
        [ResponseType(typeof(NotasMateria))]
        public IHttpActionResult DeleteNotasMateria(int id)
        {
            NotasMateria notasMateria = db.NotasMateria.Find(id);
            if (notasMateria == null)
            {
                return NotFound();
            }

            db.NotasMateria.Remove(notasMateria);
            db.SaveChanges();

            return Ok(notasMateria);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NotasMateriaExists(int id)
        {
            return db.NotasMateria.Count(e => e.Id == id) > 0;
        }
    }
}