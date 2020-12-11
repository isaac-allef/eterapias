
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('eterapia').del()
    .then(function () {
      // Inserts seed entries
      return knex('eterapia').insert([
        {
          title: "Bate papo literário",
          description: "Proposta da Equipe da UnB que será desenvolvida com a equipe da UESC, para leituras prazerosas, contatos e aproximações em tempos de pandemia.",
          dayOfWeek: "Quinta",
          clock: "16h",
          app: "Google Meet ou outro com videoconferência, a ser confirmado por email.",
        },
        {
          title: "Oficina de meditação",
          description: "Grupo que visa desenvolver a pratica de meditação tendo como objetivos proporcionar o aumento da atenção ao momento presente e auxiliar no processo de auto-regulação emocional durante e após a pandemia de covid19.",
          dayOfWeek: "Segunda",
          clock: "Grupo 1: 9:00h às 10:00h | Grupo 2: 16:00h às 17:00h",
          app: "Não definido",
        },
        {
          title: "Cuidando da qualidade do sono",
          description: "Grupo que visa desenvolver terapias de cuidado da qualidade do sono, com técnicas específicas das áreas de psicologia e fisioterapia durante e após o período de pandemia de COVID 19.",
          dayOfWeek: "Semanal com total de 8 encontros em grupo e 8 encontros individuais.",
          clock: "Não definido",
          app: "Google meet, YouTube , email , whatsapp e cartilha virtual.",
        },
        {
          title: "Diálogos em rede: grupo de apoio aos trabalhadores das redes SUS e SUAS",
          description: "Espaços de diálogos com trabalhadores das redes SUS e SUAS tendo em vista o apoio ao desenvolvimento do cuidado à saúde mental de pessoas, famílias, grupos e comunidade em geral.",
          dayOfWeek: "Sexta",
          clock: "Grupo 1:  11:00h às 12:00h e Grupo 2: 15:00h às 16:00h",
          app: "Google Meet ou outro aplicativo que será informado no email.",
        }
      ]);
    });
};
