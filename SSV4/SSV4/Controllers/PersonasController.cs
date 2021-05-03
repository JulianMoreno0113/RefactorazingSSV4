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
    [RoutePrefix("api/Personas")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PersonasController : ApiController
    {
        private Model1Container db = new Model1Container();

        [Route("ConsultarTodo")]
        [HttpGet]
        // GET: api/Personas
        public IQueryable<Persona> GetPersonas()
        {

            return db.Persona;
        }
        [Route("alumnos/materias/notas")]
        [HttpGet]
        // GET: api/Personas
        public IQueryable GetMultitablaPersona()
        {
            var datos = (
                      from per in db.Persona
                      join PM in db.PersonaMateria on per.Id equals PM.Persona_Id
                      join M in db.Materia on PM.Materia_Id equals M.Id
                      where per.Tp_Id == 1
                      select new {
                          nombrePersona = per.Nombres + per.Apellidos,
                          nombreMateria = M.Nombre,
                          idPM = PM.Id,
                          notasPersona = (
                                from NTM in db.NotasMateria
                                join PRD in db.Periodo on NTM.Periodo_Id equals PRD.Id
                                where NTM.PersonaMateriaId == PM.Id
                                select new { 
                                    idnota = NTM.Id,
                                    nota = NTM.Notas,
                                    idPeriodo = NTM.Periodo_Id,
                                    NombrePeriodo = PRD.NombreP}
                          )

                      }
                );

                return datos;


        }

        // GET: api/Personas/5
        [ResponseType(typeof(Persona))]
        public IHttpActionResult GetPersona(int id)
        {
            Persona persona = db.Persona.Find(id);
            if (persona == null)
            {
                return NotFound();
            }

            return Ok(persona);
        }

        // PUT: api/Personas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPersona(int id, Persona persona)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != persona.Id)
            {
                return BadRequest();
            }


            try
            {
                db.Entry(persona).State = EntityState.Modified;
                db.SaveChanges();
            }
            catch (Exception e)
            {
                if (!PersonaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest();
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Personas
        [ResponseType(typeof(Persona))]
        public IHttpActionResult PostPersona(Persona persona)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.Persona.Add(persona);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                return BadRequest("ERROR");
            }

            return CreatedAtRoute("DefaultApi", new { id = persona.Id }, persona);
        }

        // DELETE: api/Personas/5
        [ResponseType(typeof(Persona))]
        public IHttpActionResult DeletePersona(int id)
        {
            Persona persona = db.Persona.Find(id);
            if (persona == null)
            {
                return NotFound();
            }
            try
            {
                db.Persona.Remove(persona);
                db.SaveChanges();
                return Ok(persona);
            }
            catch (Exception e)
            {
                return BadRequest("Error Persona asiganada a materia");
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PersonaExists(int id)
        {
            return db.Persona.Count(e => e.Id == id) > 0;
        }
    }
}