<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="container">
        <h1>Termos de Serviço</h1>
        <p><strong>Última atualização:</strong> 23/09/2024</p>

        <p>Bem-vindo ao OrganizaSoft. Ao acessar e usar nosso sistema SaaS ERP, você concorda com os termos e
            condições a seguir. Se não concordar com estes Termos de Serviço, não utilize o serviço.</p>

        <h2>1. Definições</h2>
        <p>
            <strong>Serviço:</strong> O sistema SaaS ERP fornecido por OrganizaSoft.<br>
            <strong>Usuário:</strong> Qualquer pessoa ou entidade que acessa o Serviço.<br>
            <strong>Conta:</strong> A conta criada por um Usuário para acessar o Serviço.<br>
            <strong>Plano:</strong> O plano de assinatura escolhido pelo Usuário para acessar funcionalidades
            específicas do Serviço.
        </p>

        <h2>2. Aceitação dos Termos</h2>
        <p>Ao se cadastrar e utilizar o OrganizaSoft, você concorda em cumprir e ser legalmente vinculado por
            estes Termos de Serviço.</p>

        <h2>3. Modificação dos Termos</h2>
        <p>Reservamo-nos o direito de alterar estes Termos de Serviço a qualquer momento. Notificaremos você sobre
            mudanças significativas por e-mail ou em nosso site. O uso contínuo do Serviço após as alterações constitui
            aceitação das novas condições.</p>

        <h2>4. Assinaturas e Pagamentos</h2>
        <p>
            <strong>Planos:</strong> O Serviço oferece planos gratuitos e pagos, conforme descrito em nosso site.<br>
            <strong>Cobrança:</strong> Se optar por um plano pago, o pagamento será processado via <a class="text-blue-600" href="https://stripe.com">Stripe</a>.<br>
            <strong>Renovação Automática:</strong> Planos pagos são renovados automaticamente, a menos que cancelados
            com antecedência.
        </p>

        <h2>5. Cancelamento e Reembolso</h2>
        <p>
            <strong>Cancelamento:</strong> Você pode cancelar sua assinatura a qualquer momento. O cancelamento
            interromperá o acesso aos serviços pagos no final do ciclo de faturamento atual.<br>
            <strong>Reembolsos:</strong> Reembolsos serão concedidos a critério da empresa, apenas em casos
            excepcionais.
        </p>

        <h2>6. Uso Adequado do Serviço</h2>
        <p>Você concorda em usar o Serviço para fins legais e em conformidade com todas as leis aplicáveis. Não é
            permitido:</p>
        <ul>
            <li>Compartilhar sua conta com terceiros.</li>
            <li>Utilizar o Serviço de forma fraudulenta, abusiva ou ilegal.</li>
            <li>Invadir, tentar invadir ou comprometer a segurança do Serviço.</li>
        </ul>

        <h2>7. Privacidade e Dados do Usuário</h2>
        <p>Nossa <RouterLink class="text-blue-600" to="/site/politica">política de privacidade</RouterLink> governa o tratamento de suas informações pessoais. Ao usar o Serviço, você
            consente com a coleta e uso de suas informações conforme descrito nessa política.</p>

        <h2>8. Propriedade Intelectual</h2>
        <p>Todo o conteúdo do Serviço, incluindo software, design e gráficos, é de propriedade exclusiva de OrganizaSoft
             e protegido por leis de direitos autorais e propriedade intelectual.</p>

        <h2>9. Limitação de Responsabilidade</h2>
        <p>Em nenhum caso OrganizaSoft será responsável por quaisquer danos indiretos, especiais ou consequentes
            que possam surgir do uso ou incapacidade de uso do Serviço, mesmo que tenhamos sido avisados da
            possibilidade de tais danos.</p>

        <h2>10. Suspensão e Encerramento</h2>
        <p>Podemos suspender ou encerrar sua conta a qualquer momento, sem aviso prévio, se violar estes Termos de
            Serviço ou se determinarmos que seu uso do Serviço é prejudicial ao sistema ou a outros usuários.</p>

        <h2>11. Lei Aplicável</h2>
        <p>Estes Termos de Serviço serão regidos pelas leis do Brasil. Qualquer disputa será resolvida nos
            tribunais competentes desse local.</p>

        <h2>12. Contato</h2>
        <p>Se tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco em suporte@organizasoft.com.br.</p>
    </div>
</template>

<style scoped>
h1,
h2 {
    color: #7bb2ff;
}

h1 {
    text-align: center;
    font-size: large;
    margin-top: 20px;
}

h2 {
    margin-top: 20px;
}

p {
    margin-bottom: 10px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}
</style>