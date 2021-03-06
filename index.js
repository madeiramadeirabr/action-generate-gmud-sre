const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios')
var keyJira

async function run() {
    try {
        await validateTitle()
    } catch (e) {
        core.setFailed(`Essa ação só será executada em uma Pull Request.\nERRO: ${e}.`)
    }
}

async function validateTitle(){
    let titlePR = github.context.payload.pull_request.title;
    let PRDefault = /[a-z]+\([A-Z|0-9]+-\d+\):.*/
    let PRHotFix = /\(hotfix\)+\:.*/
    if (PRDefault.test(titlePR)) {
        keyJira = titlePR.split("(").pop().split(")")[0]
        await getDataJiraIssue(keyJira)
        console.log("Título da PR validada!")
    }else if(PRHotFix.test(titlePR)){
        console.log("Hotfix, não será criada a GMUD.")
        return
    } else {
        core.setFailed('ERRO. Título da Pull Request não está no padrão.\ntipoPR(IDJIRA): Descrição.')
    }
    
}

async function getDataJiraIssue(idIssue){
    try{
        let url = core.getInput('domain')
        url = `https://${url}.atlassian.net/rest/api/3/issue/${idIssue}`
        let basic_auth = core.getInput('basic-auth')
        await verifyJiraIssue(url, basic_auth)
        if(verifyJiraIssue)
            createGMUD()
    }catch(error){
        core.setFailed(error.message)
    }   
    
}

async function verifyJiraIssue(url, basic_auth){
    await axios.get(url,
        {
            headers: {
              Authorization: basic_auth,
            }
    
    }).then((res) => {
        console.log("Issue válida!")
        return true
    }).catch((err) => {
        console.log(err)
        core.setFailed("Issue não encontrada")
    })
}

async function createGMUD(){
    let url_gmud = core.getInput('url-slifer-gmud')
    let body = {
        serviceDeskId: core.getInput('service-desk-id'),
        requestTypeId: core.getInput('request-type-id'),
        id_card_issue: keyJira,
        technical_approval: core.getInput('technical-approval'),
        business_approval: core.getInput('business-approval'),
        url:  core.getInput('url-pull-request')
    }

    try {
        await axios.post(url_gmud, body,
            {
                headers: {
                  'Authorization': core.getInput('basic-auth'),
                  'apikey': core.getInput('api-key'),
                  'auth_github': core.getInput('auth-github'),
                  'Content-Type': 'application/json'
                }
        
        }).then((res) => {
            console.log("A GMUD foi criada!")
        })
    } catch (error) {
        core.setFailed("Erro ao criar GMUD")
        core.setFailed(error.response.data.message)
    }
   
}


run()