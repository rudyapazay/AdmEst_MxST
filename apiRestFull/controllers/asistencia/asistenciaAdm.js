EstudianteMdl = require("../../models/estudiante.model");
AsistenciaMdl = require('../../models/asistencias.model');

// administracion de asistencia
//iniciar dia
async function iniciarDia (req, res){
  try{
    var estudiantes = await EstudianteMdl.find({estado:"activo"});
    var fechaActual = new Date(new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-' + (new Date().getDate()+1));
    fechaActual.setHours('00');
    var asistenciaTotal = await AsistenciaMdl.find({fecha:fechaActual}).limit(10);
    //console.log(fechaActual);
    //console.log(asistenciaTotal.length);
    if(asistenciaTotal.length != '0'){
      res.status(200).send({message:"Registrado a"+await EstudianteMdl.count({estado:"activo"}) +" estudiantes Correctamente "});
    }else{
      for (estudiante of estudiantes) {
        var asistencia = new AsistenciaMdl();
        asistencia.fecha = fechaActual;
        asistencia.estudiante = estudiante._id;
        asistencia.resumen.reporte = 'F' ;
        asistencia.almuerzo.estado = 'F' ;
        await asistencia.save();
      }
      res.status(200).send({message:"Correct para " + await EstudianteMdl.count({estado:"activo"}) + " estudiantes"});
    }
  }catch(err){
    console.log(err);
    res.status(500).send("Error en la BBDD");
  }
}
//finalizar dia
async function finalizarDia(req,res){

}

//recuperar fechas laboradas
async function diasLaborados(req,res){
  var mes = req.params.mes;
  var year = new Date().getFullYear();
  var fechas = await AsistenciaMdl.find({fecha:{$gte:new Date(year,Number(mes)-1), $lt:new Date(year, mes)}}).distinct("fecha");
  res.status(200).send(fechas);
}

//recuperar resumen del dia laborado
async function reporteMes(req, res){
  var mes = req.params.mes;
  var seccion = req.params.seccion;
  var grado = req.params.grado;
//  console.log(mes);
  var year = new Date().getFullYear();
  switch (grado) {
    case 'primero':
      var asistencia = await EstudianteMdl.aggregate([
        {$match: {"referencia.primero.year":year.toString(),"referencia.primero.seccion":seccion ,"estado":"activo"}},
        {$lookup:{
          from:"asistencias",
          let:{estud:"$_id"},
          pipeline:[
            {$match:
              { $expr:
                { $and:
                  [
                    { $eq: ["$estudiante","$$estud"]},
                    { $gte:["$fecha",new Date(year,Number(mes)-1)]},
                    { $lt:[ "$fecha", new Date(year, mes) ]}
                  ]
    
                }
              }
            }
          ],      
          as:"asistencias"}
        },
        {$project:{"QRCode":0, "documentos":0}},
        {$sort:{"apellidos":+1, "nombre":+1}}
      ]);    
      break;
    case 'segundo':
        var asistencia = await EstudianteMdl.aggregate([
          {$match: {"referencia.segundo.year":year.toString(),"referencia.segundo.seccion":seccion ,"estado":"activo"}},
          {$lookup:{
            from:"asistencias",
            let:{estud:"$_id"},
            pipeline:[
              {$match:
                { $expr:
                  { $and:
                    [
                      { $eq: ["$estudiante","$$estud"]},
                      { $gte:["$fecha",new Date(year,Number(mes)-1)]},
                      { $lt:[ "$fecha", new Date(year, mes) ]}
                    ]
      
                  }
                }
              }
            ],      
            as:"asistencias"}
          },
          {$project:{"QRCode":0, "documentos":0}},
          {$sort:{"apellidos":+1, "nombre":+1}}
        ]);   
      break;
    case 'tercero':
        var asistencia = await EstudianteMdl.aggregate([
          {$match: {"referencia.tercero.year":year.toString(),"referencia.tercero.seccion":seccion ,"estado":"activo"}},
          {$lookup:{
            from:"asistencias",
            let:{estud:"$_id"},
            pipeline:[
              {$match:
                { $expr:
                  { $and:
                    [
                      { $eq: ["$estudiante","$$estud"]},
                      { $gte:["$fecha",new Date(year,Number(mes)-1)]},
                      { $lt:[ "$fecha", new Date(year, mes) ]}
                    ]
      
                  }
                }
              }
            ],      
            as:"asistencias"}
          },
          {$project:{"QRCode":0, "documentos":0}},
          {$sort:{"apellidos":+1, "nombre":+1}}
        ]);   
      break;
    case 'cuarto':
        var asistencia = await EstudianteMdl.aggregate([
          {$match: {"referencia.cuarto.year":year.toString(),"referencia.cuarto.seccion":seccion ,"estado":"activo"}},
          {$lookup:{
            from:"asistencias",
            let:{estud:"$_id"},
            pipeline:[
              {$match:
                { $expr:
                  { $and:
                    [
                      { $eq: ["$estudiante","$$estud"]},
                      { $gte:["$fecha",new Date(year,Number(mes)-1)]},
                      { $lt:[ "$fecha", new Date(year, mes) ]}
                    ]
      
                  }
                }
              }
            ],      
            as:"asistencias"}
          },
          {$project:{"QRCode":0, "documentos":0}},
          {$sort:{"apellidos":+1, "nombre":+1}}
        ]);   
      break;
    case 'quinto':
        var asistencia = await EstudianteMdl.aggregate([
          {$match: {"referencia.quinto.year":year.toString(),"referencia.quinto.seccion":seccion ,"estado":"activo"}},
          {$lookup:{
            from:"asistencias",
            let:{estud:"$_id"},
            pipeline:[
              {$match:
                { $expr:
                  { $and:
                    [
                      { $eq: ["$estudiante","$$estud"]},
                      { $gte:["$fecha",new Date(year,Number(mes)-1)]},
                      { $lt:[ "$fecha", new Date(year, mes) ]}
                    ]
      
                  }
                }
              }
            ],      
            as:"asistencias"}
          },
          {$project:{"QRCode":0, "documentos":0}},
          {$sort:{"apellidos":+1, "nombre":+1}}
        ]);
      break;
    default:
      var asistencia = [];
      break;
  }

  res.status(200).send(asistencia);
}


module.exports = {
  iniciarDia,
  diasLaborados,
  reporteMes
}