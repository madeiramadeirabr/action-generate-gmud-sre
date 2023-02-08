import * as core from '@actions/core'
let jiraDTO ={
    basic_auth: core.getInput('basic-auth'),
    domain: core.getInput('domain'),
    verifyJiraIssue: false,
    serviceDeskId: core.getInput('service-desk-id'),
    requestTypeId: core.getInput('request-type-id'),
    idCardIssue: null,
    technicalApproval: core.getInput('technical-approval'),
    businessApproval: core.getInput('business-approval'),
    urlPullRequest:  core.getInput('url-pull-request'),
    urlServiceDesk:  core.getInput('url-slifer-gmud'),
    apikey: core.getInput('api-key'),
    authGithub: core.getInput('auth-github')
}

export default jiraDTO;
