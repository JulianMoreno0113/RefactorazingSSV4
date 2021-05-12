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


            //var datos = db.Persona.Include(p => p.PersonaMateria)
            // .Where((persona) => persona.Tp_Id == 1)
            // .Select(p => new { nombrePersona = p.Nombres+ " "+ p.Apellidos,
            // nombreMateria= p.PersonaMateria.Select(pm=>new { pm.Materia.Nombre}),
            // idPM= p.PersonaMateria.Select(pm=>new { pm.Id}),
            //Notas = p.PersonaMateria.Select(pm => new { Notas = pm.NotasMateria }) });

            var datos = db.Persona.Join(db.PersonaMateria, p => p.Id, pm => pm.Persona_Id, (p, pm) => new { p, pm })
                .Join(db.Materia, personaMateria=> personaMateria.pm.Materia_Id, m=>m.Id,(personaMateria,m)=>new {personaMateria,m })
                .Where(p=>p.personaMateria.p.Tp_Id == 1)
                .Select(o=> new { 
                    nombrePersona= o.personaMateria.p.Nombres+ " "+ o.personaMateria.p.Apellidos,
                    nombreMateria= o.m.Nombre,
                    idPM = o.personaMateria.pm.Id,
                    profe= (db.Persona.Join(db.PersonaMateria, pro=>pro.Id, prmat =>prmat.Persona_Id,(pro,prmat)=>new { pro, prmat })
                    .Where(pr=>pr.pro.Tp_Id==2 && pr.prmat.Materia_Id == o.m.Id ))
                    .Select(pro=>pro.pro.Nombres).FirstOrDefault(),
                    notasPersona=(db.NotasMateria.Join(db.Periodo, ntm=>ntm.Periodo_Id,per=>per.Id,(ntm,per)=>new {ntm, per})
                    .Where(nt=> nt.ntm.PersonaMateriaId == o.personaMateria.pm.Id))
                    .Select(notm => new {
                        idnota = notm.ntm.Id,
                        nota = notm.ntm.Notas,
                        idPeriodo = notm.ntm.Periodo_Id,
                        NombrePeriodo = notm.per.NombreP
                    })
                });


            //var datos = (
            //          from per in db.Persona
            //          join PM in db.PersonaMateria on per.Id equals PM.Persona_Id
            //          join M in db.Materia on PM.Materia_Id equals M.Id
            //          where per.Tp_Id == 1
            //          select new
            //          {
            //              nombrePersona = per.Nombres + " " + per.Apellidos,
            //              nombreMateria = M.Nombre,
            //              idPM = PM.Id,
            //              profe = (
            //                    from profeMatea in db.PersonaMateria
            //                    join personaProfe in db.Persona on profeMatea.Persona_Id equals personaProfe.Id
            //                    where profeMatea.Materia_Id == M.Id && personaProfe.Tp_Id == 2
            //                    select personaProfe.Nombres
            //              ).FirstOrDefault(),
            //              notasPersona = (
            //                    from NTM in db.NotasMateria
            //                    join PRD in db.Periodo on NTM.Periodo_Id equals PRD.Id
            //                    where NTM.PersonaMateriaId == PM.Id
            //                    select new
            //                    {
            //                        idnota = NTM.Id,
            //                        nota = NTM.Notas,
            //                        idPeriodo = NTM.Periodo_Id,
            //                        NombrePeriodo = PRD.NombreP
            //                    }
            //              )

            //          }
            //    );

            return datos;


        }

        // GET: api/Personas/5
        [ResponseType(typeof(Persona))]
        public IQueryable GetPersona(int id)
        {
            var datos = (
                      from per in db.Persona
                      join PM in db.PersonaMateria on per.Id equals PM.Persona_Id
                      join M in db.Materia on PM.Materia_Id equals M.Id
                      where per.Tp_Id == 1 && per.Id == id
                      select new
                      {
                          nombrePersona = per.Nombres + " " + per.Apellidos,
                          documento = per.NDoc,
                          tipoDocumento = per.TDoc_Id,
                          nombreMateria = M.Nombre,
                          idPM = PM.Id,
                          profe = (
                                from profeMatea in db.PersonaMateria
                                join personaProfe in db.Persona on profeMatea.Persona_Id equals personaProfe.Id
                                where profeMatea.Materia_Id == M.Id && personaProfe.Tp_Id == 2
                                select personaProfe.Nombres
                          ).FirstOrDefault(),
                          notasPersona = (
                                from NTM in db.NotasMateria
                                join PRD in db.Periodo on NTM.Periodo_Id equals PRD.Id
                                where NTM.PersonaMateriaId == PM.Id
                                select new
                                {
                                    idnota = NTM.Id,
                                    nota = NTM.Notas,
                                    idPeriodo = NTM.Periodo_Id,
                                    NombrePeriodo = PRD.NombreP,
                                    porcentaje = PRD.Porcentaje
                                }
                          )

                      }
                ) ;

            return datos;

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