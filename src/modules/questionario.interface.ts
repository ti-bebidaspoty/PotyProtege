export interface IQuestao {
  ID: string;
  Questao: string;
  Opcoes: string[];
  Resposta: string;
  isAnswered: boolean;
}

export const Questoes: IQuestao[] = [
  {
    ID: '1',
    Questao: 'Por que a educação sobre segurança cibernética é importante?',
    Opcoes: [
      'a) Porque permite o uso de redes sociais de forma segura.',
      'b) Porque ajuda a proteger os usuários contra-ataques cibernéticos e fraudes.',
      'c) Porque facilita o trabalho remoto.',
      'd) Porque reduz o uso de e-mails.'
    ],
    Resposta: 'b) Porque ajuda a proteger os usuários contra-ataques cibernéticos e fraudes.',
    isAnswered: false
  },
  {
    ID: '2',
    Questao: 'Qual é o papel do T.I. em caso de dúvidas sobre segurança cibernética?',
    Opcoes: [
      'a) Fornecer suporte e orientação para evitar ameaças e resolver problemas.',
      'b) Criar e-mails automáticos para todos os colaboradores.',
      'c) Enviar boletins informativos mensais.',
      'd) Compartilhar informações pessoais em redes sociais.'
    ],
    Resposta: 'a) Fornecer suporte e orientação para evitar ameaças e resolver problemas.',
    isAnswered: false
  },
  {
    ID: '3',
    Questao: 'Qual é uma das primeiras ações a se tomar ao suspeitar de um golpe online?',
    Opcoes: [
      'a) Ignorar e seguir com suas atividades normais.',
      'b) Clicar nos links para verificar a autenticidade.',
      'c) Comunicar imediatamente a equipe de TI.',
      'd) Compartilhar o e-mail ou mensagem com outros colegas.'
    ],
    Resposta: 'c) Comunicar imediatamente a equipe de TI.',
    isAnswered: false
  },
  {
    ID: '4',
    Questao: 'Por que é importante estar ciente sobre golpes online?',
    Opcoes: [
      'a) Porque ajuda a entender as novas tecnologias.',
      'b) Porque ajuda a proteger contra fraudes e a manter a segurança digital.',
      'c) Porque facilita o acesso a novas promoções online.',
      'd) Porque evita a necessidade de usar senhas complexas.'
    ],
    Resposta: 'b) Porque ajuda a proteger contra fraudes e a manter a segurança digital.',
    isAnswered: false
  },
  {
    ID: '5',
    Questao: 'Qual é o objetivo principal de um ataque de phishing?',
    Opcoes: [
      'a) Criptografar arquivos e exigir resgate.',
      'b) Enganar o usuário para que forneça informações sensíveis.',
      'c) Proteger os dados do usuário contra acessos não autorizados.',
      'd) Fazer backup de todos os dados em um servidor seguro.'
    ],
    Resposta: 'b) Enganar o usuário para que forneça informações sensíveis.',
    isAnswered: false
  },
  {
    ID: '6',
    Questao: 'O que é ransomware?',
    Opcoes: [
      'a) Um tipo de vírus que infecta o hardware.',
      'b) Um tipo de malware que criptografa os arquivos de um sistema e exige um resgate.',
      'c) Um software de proteção contra vírus.',
      'd) Uma ferramenta para fazer backups automáticos.'
    ],
    Resposta: 'b) Um tipo de malware que criptografa os arquivos de um sistema e exige um resgate.',
    isAnswered: false
  },
  {
    ID: '7',
    Questao: 'Qual das seguintes ações NÃO ajuda a prevenir um ataque de ransomware?',
    Opcoes: [
      'a) Manter o software atualizado.',
      'b) Fazer backups regulares.',
      'c) Clicar em links suspeitos.',
      'd) Usar autenticação de dois fatores.'
    ],
    Resposta: 'c) Clicar em links suspeitos.',
    isAnswered: false
  },
  {
    ID: '8',
    Questao: 'O que é um vírus de computador?',
    Opcoes: [
      'a) Um programa malicioso que se replica e pode danificar arquivos e sistemas.',
      'b) Um programa usado para proteger o sistema contra malwares.',
      'c) Um tipo de firewall que impede o acesso não autorizado.',
      'd) Um software de segurança usado em redes corporativas.'
    ],
    Resposta: 'a) Um programa malicioso que se replica e pode danificar arquivos e sistemas.',
    isAnswered: false
  },
  {
    ID: '9',
    Questao: 'Qual é a melhor forma de evitar cair em golpes de phishing?',
    Opcoes: [
      'a) Clicar em todos os links para verificar a autenticidade.',
      'b) Desconfiar de e-mails e mensagens suspeitas e verificar a autenticidade das fontes.',
      'c) Compartilhar informações pessoais apenas em redes sociais.',
      'd) Manter o computador desligado.'
    ],
    Resposta: 'b) Desconfiar de e-mails e mensagens suspeitas e verificar a autenticidade das fontes.',
    isAnswered: false
  },
  {
    ID: '10',
    Questao: 'O que é malware?',
    Opcoes: [
      'a) Um software que protege contra vírus.',
      'b) Qualquer tipo de software malicioso projetado para causar danos.',
      'c) Um aplicativo usado para fazer backups.',
      'd) Um antivírus especializado para redes corporativas.'
    ],
    Resposta: 'b) Qualquer tipo de software malicioso projetado para causar danos.',
    isAnswered: false
  }
]
