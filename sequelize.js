const { Sequelize, DataTypes } = require('sequelize')
const UserModel = require ('../models/user')
const bcrypt = require('bcrypt')  
const vignerons = require ('./mock-vigneron')
const VigneronModel = require ('../models/vigneron')
const animations = require('./mock-animation')
const animationModel = require ('../models/animation')
const materiels = require('./mock-materiel')
const materielModel = require('../models/materiel')
const sponsors = require ('./mock-sponsor')
const SponsorModel = require ('../models/sponsor')
const evenements = require('./mock-evenement')
const EvenementModel = require('../models/evenement') 


const sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})

const User = UserModel(sequelize, DataTypes)
const Vigneron = VigneronModel (sequelize, DataTypes)
const Animation = animationModel (sequelize, DataTypes)
const Materiel = materielModel (sequelize, DataTypes)
const Sponsor = SponsorModel (sequelize, DataTypes)
const Evenement = EvenementModel (sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    bcrypt.hash('admin', 10)
    .then(hash =>  User.create ({
        username: "admin",
        password: hash
    }))
    .then(user => console.log(user.toJSON()))
    console.log('La base de donnée a bien été initialisée !')
  
    vignerons.map(vigneron => {
        Vigneron.create({
            name: vigneron.name,
            prix: vigneron.prix,
            cout: vigneron.cout,
            contact: vigneron.contact
          }).then(vigneron => console.log(vigneron.toJSON()))
          console.log('La base de donnée vignerons a bien été initialisée !')
        })

        animations.map(animation => {
          Animation.create({
              name: animation.name,
              prix: animation.prix,
              cout: animation.cout,
              contact: animation.contact,
            }).then(animation => console.log(animation.toJSON()))
            console.log('La base de donnée animations a bien été initialisée !')
          })

        materiels.map(materiel => {
          Materiel.create({
            name: materiel.name,
            quantite_necessaire: materiel.quantite_necessaire,
            quantite_en_stock: materiel.quantite_en_stock,
            quantite_sur_place: materiel.quantite_sur_place,
            contact_location: materiel.contact_location,
          }).then(materiel => console.log(materiel.toJSON()))
          console.log('La base de donnée matériels a bien été initialisée !')
        })
        
        sponsors.map(sponsor => {
          Sponsor.create({
            name: sponsor.name,
            prix: sponsor.prix,
            cout: sponsor.cout,
            contact: sponsor.contact,
            }).then(sponsor => console.log(sponsor.toJSON()))
            console.log('La base de donnée sponsors a bien été initialisée !')
        })
        evenements.map(evenement => {
          Evenement.create({
            name: evenement.name,
            nombre_de_personnes: evenement.nombre_de_personnes,
            lieu: evenement.lieu,
            Objectif_de_l_evenement: evenement.Objectif_de_l_evenement,
            }).then(evenement => console.log(evenement.toJSON()))
            console.log('La base de donnée evenements a bien été initialisée !')
          })
    }) 
}

module.exports = { 
  initDb, Vigneron, Sponsor, Materiel, Animation, Evenement
}