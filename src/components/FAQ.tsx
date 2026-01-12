import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona a entrega?",
    answer:
      "A entrega dos equipamentos é realizada exclusivamente em escritório próprio, localizado em Ciudad del Este, Paraguai, mediante agendamento de data e horário, não havendo entrega no Brasil.",
  },
  {
    question: "Os valores de rentabilidade são garantidos?",
    answer:
      "Resultados e valores apresentados são estimativas baseadas em dados em tempo real coletados de diversas fontes, considerando dificuldade da rede e preço do Bitcoin, e estão sujeitos a variações de mercado, rede, custo de energia local e taxas de pool. A rentabilidade real pode variar e não constitui garantia de retorno financeiro, sendo a calculadora apenas uma referência.",
  },
  {
    question: "Como funciona a garantia e o processo de reparo dos equipamentos?",
    answer:
      "A garantia dos nossos equipamentos cobre defeitos de fabricação e danos ocorridos durante o envio. Ela é válida por 3 meses a partir da data da compra. Caso seja necessário acionar a garantia, o reparo ou substituição será realizado por uma assistência autorizada no Paraguai indicada pelo fabricante.",
  },
  {
    question: "Como funciona o processo de compra?",
    answer:
      "Nosso atedimento é personalizado e exclusivo para cada cliente, todas as compras e pedido são realizados através do canal do WhatsApp da Syrion.?",
  },
  {
    question: "Quais são as formas de pagamento disponíveis?",
    answer:
      "Os pagamentos são aceitos exclusivamente em criptomoedas ou em dólares em espécie. Não trabalhamos com cartões, transferências bancárias ou outros meios de pagamento",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perguntas <span className="gradient-text">Frequentes</span>
          </h2>
          <p className="text-muted-foreground">
            Tire suas dúvidas sobre mineração de Bitcoin e nossos equipamentos.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-panel px-6 border-none"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
