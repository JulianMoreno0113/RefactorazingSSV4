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
    public class PersonaMateriasController : ApiController
    {
        private Model1Container db = new Model1Container();

        // GET: api/PersonaMaterias
        public IQueryable GetPersonaMateria()
        {

            var lst = db.PersonaMateria.Join(db.Persona, pm => pm.Persona_Id, p => p.Id, (pm, p) => 
            new { pm,p }).Join(db.Materia, pm => pm.pm.Materia_Id,m=>m.Id,(pm,m)=>
            new {pm,m }).Select(o=> new { 
            Id = o.pm.pm.Id,
            IdDocente= o.pm.pm.Id,
            IdMateria= o.pm.pm.Materia_Id,
            IdPersona = o.pm.pm.Persona_Id,
            NombrePersona=o.pm.p.Nombres,
            ApellidoPersona = o.pm.p.Apellidos,
            Materia= o.m.Nombre,
            TipoPersona= o.pm.p.Tp_Id
            });

            //var lst = (from a in db.PersonaMateria
            //           join b in db.Persona on a.Persona_Id equals b.Id
            //           join c in db.Materia on a.Materia_Id equals c.Id



            //           select new
            //           {
            //               Id = a.Id,
            //               IdDocente = a.Id,
            //               IdMateria = a.Materia_Id,
            //               IdPersona = a.Persona_Id,
            //               NombrePersona = b.Nombres,
            //               ApellidoPersona = b.Apellidos,
            //               Materia = c.Nombre,
            //               TipoPersona = b.Tp_Id
            //           });



            return lst;
        }

        // GET: api/PersonaMaterias/5
        [ResponseType(typeof(PersonaMateria))]
        public IHttpActionResult GetPersonaMateria(int id)
        {
            PersonaMateria personaMateria = db.PersonaMateria.Find(id);
            if (personaMateria == null)
            {
                return NotFound();
            }

            return Ok(personaMateria);
        }

        // PUT: api/PersonaMaterias/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPersonaMateria(int id, PersonaMateria personaMateria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != personaMateria.Id)
            {
                return BadRequest();
            }

            db.Entry(personaMateria).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonaMateriaExists(id))
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

        // POST: api/PersonaMaterias
        [ResponseType(typeof(PersonaMateria))]
        public IHttpActionResult PostPersonaMateria(PersonaMateria personaMateria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PersonaMateria.Add(personaMateria);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = personaMateria.Id }, personaMateria);
        }

        // DELETE: api/PersonaMaterias/5
        [ResponseType(typeof(PersonaMateria))]
        public IHttpActionResult DeletePersonaMateria(int id)
        {
            PersonaMateria personaMateria = db.PersonaMateria.Find(id);
            if (personaMateria == null)
            {
                return NotFound();
            }

            db.PersonaMateria.Remove(personaMateria);
            db.SaveChanges();

            return Ok(personaMateria);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PersonaMateriaExists(int id)
        {
            return db.PersonaMateria.Count(e => e.Id == id) > 0;
        }
    }
}