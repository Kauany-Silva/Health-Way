# 🌐 Health Way

**Health Way** é uma aplicação web desenvolvida como projeto de startup para a ETEC Dr. Geraldo José Rodrigues Alckmin.  
Nosso objetivo é ajudar pessoas a organizarem suas vacinas e exames de forma simples, segura e acessível.

---

## 👨‍👩‍👧‍👦 Equipe

- **Kauany Cristine da Silva Moraes** – Líder do Projeto/ Desenvolvedora do Código Principal
- **Livia Fernanda Lemos de Paiva** – Desenvolvedora Front-end   
- **Maria Julia Costa** – Designer UI/UX  
- **Yasmin Salgado Antunes Pires** – Branding/ Identidade Visual



## 📌 Descrição do Projeto

**Problema:**  
Muitas pessoas têm dificuldade em acompanhar o histórico de vacinas, exames e cuidados de saúde, tanto próprios quanto de seus pets. Isso gera esquecimentos, atrasos em vacinação e dificuldade de acesso rápido a informações médicas.

**Solução:**  
O **HealthWay** é uma plataforma intuitiva que centraliza informações de saúde, permitindo armazenar vacinas, exames e dados de pets, além de calcular o tempo de espera em hospitais próximos. Com isso, os usuários têm tudo organizado, acessível e atualizado, prevenindo esquecimentos e facilitando decisões rápidas.

**Vídeo de Apresentação da Equipe e da Startup**
- [Assista Aqui](https://drive.google.com/file/d/1R0EJGQAXs27atADOoi9EAPbZFEz-fMfx/view?usp=drive_link)

**Funcionalidades:**
Com o site, o usuário pode:
- Armazenar suas vacinas e exames de forma digital.  
- Ter acesso rápido e organizado às informações.  
- Garantir que não perca datas importantes de vacinação ou consultas.  
- Consultar horários, datas, nomes e finalidade de seus medicamentos.
- Acessar histórico de consultas.
- Verificar consultas e medicamentos de seus animais de estimação.
- Consultar hospitais próximos e tempo médio de espera.



## 🖥️ Tecnologias Utilizadas

- React
- Node.js
- Vite
- CSS Modules
- React Router
- React Icons
- Leaflet & React-Leaflet
- JSON Server


## 📂 Estrutura do Projeto

O projeto está organizado em **Components** e **Pages**, para manter a modularidade e facilitar a manutenção:

### Components
Todos os componentes reutilizáveis estão na pasta `src/Components` e exportados via `index.js`:

- **Cabecalho:** Cabeçalho do site com logo e título.  
- **Conteudo:** Seções de conteúdo reutilizáveis na Landing Page.  
- **Rodape:** Rodapé com informações da startup.  
- **BotaoAcessibilidade:** Botão para recursos de acessibilidade.  
- **Cards:** Cards informativos sobre serviços e funcionalidades.  
- **Contato:** Formulário de contato com nome, e-mail e mensagem.  
- **Hero:** Seção inicial com slogan e chamada para ação.  
- **Menu:** Menu de navegação principal.  
- **Sobre:** Apresentação da equipe.  
- **VacinaCard:** Card individual de vacinas ou exames.  
- **ScrollToTop** Gerenciamento da rolagem da página.
- **Rotas** Organização das rotas/path da aplicação.
- **RotasPrivadas** Controle de acesso às rotas privadas.

### Pages
As páginas correspondem às rotas da aplicação e estão em `src/Pages`:

- **Landing:** Página inicial com Hero, Cards e informações principais.  
- **Login:** Tela de login para usuários.  
- **Cadastro:** Tela de cadastro de novos usuários.  
- **SaibaMaisSobreNos:** Página com informações detalhadas sobre a startup e equipe.  
- **Dashboard:** Painel principal do usuário com rotas filhas:  
- **CarteiraVacinacao:** Histórico e cadastro de vacinas.  
- **Pets:** Controle de informações de animais de estimação.  
- **LocalHospital:** Consulta de hospitais próximos e tempo de espera.  
- **Consultas:** Histórico e agendamento de consultas médicas.  
- **Medicamentos:** Controle de medicamentos e doses.
- **NotFound:** Página dedicada à erros de rotas.

## Referências

1. **Portal de Boas Práticas da Fiocruz**  
BRASIL. Ministério da Saúde. Secretaria de Vigilância em Saúde. Sociedade Brasileira de Infectologia; Sociedade Brasileira de Genética Médica; Sociedade Brasileira de Pediatria; Sociedade Brasileira de Imunizações; Universidade de Pernambuco; Universidade Federal de Pelotas. *Nota Técnica: Imunização em situações de emergência*. Brasília, 10 maio 2024. Disponível em: [Acesse aqui](https://portaldeboaspraticas.iff.fiocruz.br/wp-content/uploads/2024/05/NT-Imunizacao-em-enchentes_SBI_SGI_SBIm_10-05-2024.pdf). Acesso em: 16 set. 2025.

2. **Cadernos de Saúde Pública da Fiocruz**  
BRASIL. Ministério da Saúde. Secretaria de Vigilância em Saúde. Secretaria de Atenção à Saúde. *Cobertura e atraso vacinal nas coortes de nascidos em 2019 e 2020*. Cadernos de Saúde Pública, v. 41, n. 4, 2025. Disponível em: [Acesse aqui](https://cadernos.ensp.fiocruz.br/ojs/index.php/csp/article/download/9895/20445/66406). Acesso em: 16 set. 2025.

3. **Cadernos de Saúde Pública da Fiocruz**  
BRASIL. Ministério da Saúde. Secretaria de Vigilância em Saúde. Secretaria de Atenção à Saúde. *Incompletude vacinal infantil de vacinas novas e antigas e fatores associados: coorte de nascimento BRISA, São Luís, Maranhão, Nordeste do Brasil*. Cadernos de Saúde Pública, v. 34, n. 3, 2018. Disponível em: [Acesse aqui](https://cadernos.ensp.fiocruz.br/ojs/index.php/csp/article/view/6666). Acesso em: 16 set. 2025.

4. **Estadão**  
ESTADÃO. *Temdevacinar*. Expresso, 29 out. 2021. Disponível em: [Acesse aqui](https://expresso.estadao.com.br/wp-content/uploads/2021/10/expresso29out21.pdf). Acesso em: 16 set. 2025.

5. **Saúde Indígena**  
BRASIL. Ministério da Saúde. Fundação Oswaldo Cruz. *Distritalização da saúde indígena no Brasil*. Brasília, 2018. Disponível em: [Acesse aqui](https://repositorio.bvspovosindigenas.fiocruz.br/bitstream/bvs/754/2/810878140.pdf). Acesso em: 16 set. 2025.



## ⚙️ Como Rodar o Projeto Localmente

**Setup do Projeto**  

**Pré-requisitos:**  
- Node.js **≥v17**  
- npm (vem junto com o Node.js) ou yarn  

**Passos para rodar o projeto:**

```bash
# Clonar o repositório
git clone <https://github.com/Kauany-Silva/Health-Way.git>

# Entrar na pasta do projeto
cd health-way

# Instalar dependências
npm install  # ou yarn

# Rodar API
npm run api # ou yarn api

# Rodar em modo de desenvolvimento
npm run dev  # ou yarn dev
```



## 🌐 Acessar o Health Way

Você pode acessar o site da HealthWay neste link:  
[https://health-way-gray.vercel.app/](https://health-way-gray.vercel.app/)
