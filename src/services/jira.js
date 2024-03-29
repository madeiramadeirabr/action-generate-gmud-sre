import { setFailed } from "@actions/core";
import axios from "axios";
export default class Jira {

    constructor(dto) {
        this.basic_auth = dto.basic_auth
        this.domain = dto.domain
        this.verifyJiraIssue = dto.verifyJiraIssue;
        this.serviceDeskId= dto.serviceDeskId
        this.requestTypeId= dto.requestTypeId
        this.idCardIssue= dto.idCardIssue
        this.technicalApproval= dto.technicalApproval
        this.businessApproval= dto.businessApproval
        this.urlPullRequest=  dto.urlPullRequest
        this.urlServiceDesk=  dto.urlServiceDesk
        this.apikey = dto.apikey
        this.authGithub = dto.authGithub
    }


    async  issueExists(idIssue){
        try{
            const url = `https://${this.domain}.atlassian.net/rest/api/3/issue/${idIssue}`
            await axios.get(url,{
                headers: {
                    Authorization: this.basic_auth,
                }
            })

            console.log("Issue válida!")
            this.verifyJiraIssue = true
            
        }catch(error){
            this.verifyJiraIssue = false
            setFailed("Issue não encontrada")
        }   
        
    }
    

    async createServiceDesk(){
        let url_gmud = this.urlServiceDesk
        let body = {
            serviceDeskId: this.serviceDeskId,
            requestTypeId: this.requestTypeId,
            id_card_issue: this.idCardIssue,
            technical_approval: this.technicalApproval,
            business_approval: this.businessApproval,
            url:  this.urlPullRequest
        }

        let headers = {
            headers: {
                'Authorization': this.basic_auth,
                'apikey': this.apikey,
                'auth_github': this.authGithub,
                'Content-Type': 'application/json'
            }
        }
        
        if(!this.verifyJiraIssue){
            return false
        }

        try {
            const response = await axios.post(url_gmud, body,headers)
            if(response.status != 201 && response.status!= 200){
                setFailed("Erro ao criar GMUD! \n Verifique se suas credenciais e URLs estão corretas!")
                return    
            }
            console.log("A GMUD foi criada! ")
        } catch (error) {
            setFailed("Erro ao criar GMUD!")
            setFailed(error.response.data.message)
        }
    }
}