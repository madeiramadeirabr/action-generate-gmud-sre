"use strict"
import Validate  from '../services/validate.js';
import Jira from'../services/jira.js';
import GithubService from'../services/github.js';
import jiraDTO from '../dto/jiraDTO.js';

export default class ActionController{

    constructor(github){
        this.github = github
    }
    async createGMUD(){
        let authGithub = jiraDTO.authGithub;
        let githubService = new GithubService(authGithub, this.github)

        const runId = this.github.context.runId
        await githubService.getRunAll(runId)

        let titlePR = this.github.context.payload.pull_request.title;
        let validate = new Validate(this.github.context.payload.pull_request.head.repo.owner)
        
        if (validate.isPRDefault(titlePR)) {
            let keyJira = titlePR.split("(").pop().split(")")[0]
            console.log("Título da PR validada!")
            jiraDTO.idCardIssue = keyJira
            let jira = new Jira(jiraDTO);
            await jira.issueExists(keyJira)
            await jira.createServiceDesk()
        }else if(validate.isHotfix(titlePR)){
            console.log("Hotfix, não será criada a GMUD.")
            return
        } else {
            core.setFailed('ERRO. Título da Pull Request não está no padrão.\ntipoPR(IDJIRA): Descrição.')
        }
        
    }
}