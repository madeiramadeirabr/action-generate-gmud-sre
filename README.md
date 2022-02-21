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
[Team-Platform-Services](https://github.com/orgs/madeiramadeirabr/teams/team-platform-services 'Team-Platform-Services')

## Requisitos:
1. É necessário solicitar junto ao time de Segurança a criação das _"secrets"_ no repositório do GitHub:
- `TECHNICAL_APPROVAL`
- `BUSINESS_APPROVAL`
>  Estas “secrets” devem receber, respectivamente os e-mails do “Aprovador Técnico” e “Aprovador de Negócios” responsáveis pela GMUD que será criada.

2. Utilizar as _“secrets”_, a nível de organização no GitHub:
- `GLOBALS_SRE_BASIC_AUTH_JIRA`
- `GLOBALS_SRE_APIKEY_JAZZ_GMUD`
- `GLOBALS_SRE_BASIC_AUTH_GITHUB`
- `GLOBALS_SRE_URL_SLIFER_GMUD`

3. Título da "Pull Request" dentro do padrão esperado pela [`action-check-title-pr-pattern`](https://github.com/madeiramadeirabr/action-check-title-pr-pattern 'action-check-title-pr-pattern')

## Exemplo de uso (da action):
1. Crie o diretório `.github` na raiz do Projeto;
2. Crie dentro do diretório `.github` o diretório `workflows`;
3. Crie um arquivo `.yml` ou `.yaml` com o nome (sugestão): `gmud.yml` ou `gmud.yaml`;
4. Utilize o template abaixo:
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
          basic-auth: ${{ secrets.GLOBALS_SRE_BASIC_AUTH_JIRA }}
          api-key: ${{ secrets.GLOBALS_SRE_APIKEY_JAZZ_GMUD }}
          auth-github: ${{ secrets.GLOBALS_SRE_BASIC_AUTH_GITHUB }}
          service-desk-id: '31'
          request-type-id: '538'
          technical-approval: ${{ secrets.TECHNICAL_APPROVAL }}
          business-approval: ${{ secrets.BUSINESS_APPROVAL }}
          url-pull-request: ${{ github.event.pull_request._links.self.href }}/${{ github.run_id}}
          url-slifer-gmud: ${{ secrets.GLOBALS_SRE_URL_SLIFER_GMUD }}
```
