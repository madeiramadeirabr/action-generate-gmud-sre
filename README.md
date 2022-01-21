![img](https://github.com/madeiramadeirabr/action-generate-gmud-sre/blob/staging/img/action-generate-gmud-sre.svg)

# action-generate-gmud-sre

## Descrição:
Action que valida:
- Título de Pull Request

- Captura com base no Título a Issue do Jira
- Valida a Existência dessa Issue
- Cria a GMUD no Jira

## Contexto de negócio:
Irá compor a estrutura padrão que está sendo desenvolvida para o CI/CD da [MadeiraMadeira](https://github.com/madeiramadeirabr 'MadeiraMadeira'), sendo aplicável a todos os Projetos Novos (e "antigos").

## Squad:
[SRE-Architecture-Carpentry](https://github.com/orgs/madeiramadeirabr/teams/squad-sre-architecture-carpentry 'SRE-Architecture-Carpentry')

## Requisitos:
Repositório precisa ser *Público*

## Exemplos de uso (da action):


```yml
name: CI
on:
  pull_request:
    branches:
      - production

jobs:
  create-gmud:
    runs-on: ubuntu-latest
    name: 'create-gmud'
    steps:
      - uses: madeiramadeirabr/action-generate-gmud-sre@v1
        with: 
          domain: 'madeiramadeira'
          basic-auth: ${{ secrets.BASIC_AUTH_JIRA }}
          api-key: ${{ secrets.APIKEY_JAZZ }}
          auth-github: ${{ secrets.BASIC_AUTH_GITHUB}}
          service-desk-id: '31'
          request-type-id: '538'
          technical-approval: ${{ secrets.TECHNICAL_APPROVAL }}
          business-approval: ${{ secrets.BUSINESS_APPROVAL }}
          url-pull-request: ${{ github.event.pull_request._links.self.href }}/${{ github.run_id}}
          url-slifer-gmud: ${{ secrets.URL_SLIFER_GMUD }}
```