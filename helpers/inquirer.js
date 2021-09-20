const inquirer = require('inquirer');
require('colors')

const questions = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [
      {
        name: `${'1.'.green} Buscar ciudad`,
        value: 1
      },
      {
        name: `${'2.'.green} Historial`,
        value: 2
      },
      {
        name: `${'0.'.green} Salir`,
        value: 0
      }
    ]
  }
]

const inquiererMenu = async() => {

  console.clear()
  console.log('==========================='.green)
  console.log('   Seleccione una opción')
  console.log('===========================\n'.green)

  const { option } = await inquirer.prompt(questions)

  return option
}

const pause = async() => {
  
  console.log('\n')
  await inquirer.prompt([
    {
      type: 'input',
      name: 'pause',
      message: `Presione ${'ENTER'.green} para continuar`
    }
  ])

}

const readInput = async(message) => {
  
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true
      }
    }
  ]

  const {desc} = await inquirer.prompt(question)

  return desc
}

const listPlaces = async(places = []) => {
  
  const choices = places.map(({id, name}, index) => ({ 
    value: id,
    name: `${((index+1)+'.').green} ${name}`
  }))

  choices.unshift({
    value: 0,
    name: '0.'.green + ' Cancelar'
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Seleccione lugar',
      choices
    }
  ]

  const { id } = await inquirer.prompt(questions)

  return id

}

const confirm = async(message) => {
 
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]

  const { ok } = await inquirer.prompt(question)

  return ok

}

const showCheckList = async(tasks = []) => {
  
  const choices = tasks.map(({id, desc, finishAt}, index) => ({ 
    value: id,
    name: `${((index+1)+'.').green} ${desc}`,
    checked: finishAt ? true : false
  }))

  const questions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(questions)

  return ids

}

module.exports = {
  inquiererMenu,
  pause,
  readInput,
  listPlaces,
  confirm,
  showCheckList
}