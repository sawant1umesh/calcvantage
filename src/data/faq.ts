import type { FaqCategory } from '../types/faq';

/**
 * Frequently Asked Questions for CalcVantage.com.
 * Answers are authored content and may include trusted inline links.
 */
export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'general',
    label: 'General',
    description:
      'How the platform works, what it costs, and which countries are supported.',
    items: [
      {
        id: 'how-calculators-work',
        question: 'How do the CalcVantage calculators work?',
        answer:
          'Every calculator runs entirely in your browser. When you type a home price, an interest rate, or a savings goal, the arithmetic happens locally on your device with JavaScript — there is no page reload, no form submission, and no server processing. You see results update instantly as you adjust your inputs. Because the math runs on your machine, the calculators work even without a connection once the page is loaded.',
      },
      {
        id: 'are-calculators-free',
        question: 'Are the calculators free to use?',
        answer:
          'Yes — every calculator on CalcVantage is free, with no paywalls, no trials, and no hidden fees. You do not need an account, a credit card, or a sign-up to use any tool. We keep the platform free by keeping it simple, and we never sell your information.',
      },
      {
        id: 'which-countries-supported',
        question: 'Which countries are supported?',
        answer:
          'CalcVantage is built for three markets today: the United States, Canada, and Australia. Each calculator applies the local conventions for that country — such as Canadian semi-annual mortgage compounding or Australian stamp duty — and lets you display results in USD, CAD, or AUD. Additional countries and localized rules may be added over time.',
      },
      {
        id: 'account-required',
        question: 'Do I need to create an account or log in?',
        answer:
          'No. CalcVantage has no accounts and no logins. Your inputs live on the page you are viewing and never in a profile, database, or account on our side. This keeps your financial details private and makes the calculators quick to start using.',
      },
      {
        id: 'what-happens-to-inputs',
        question: 'What happens to the numbers I enter?',
        answer:
          'Nothing is uploaded or stored. The values you type remain on your device for as long as the page is open, and we never save them. If you refresh the page, you start fresh. When you choose to copy a share link, your inputs are encoded into that link so you (or someone you send it to) can reproduce the same scenario — but nothing is sent to our servers automatically.',
      },
    ],
  },
  {
    id: 'mortgage',
    label: 'Mortgage',
    description:
      'Country-specific mortgage math: compounding, local taxes, insurance, and amortization.',
    items: [
      {
        id: 'mortgage-calculator-basics',
        question: 'How does the Mortgage Calculator work?',
        answer:
          'You enter a home price, down payment, interest rate, loan term, and payment frequency. The calculator derives your loan principal and computes the monthly payment using the standard amortization formula for your country. It also factors in local extras — property taxes, insurance, and country-specific fees — and produces a full amortization schedule showing principal, interest, and remaining balance for every period.',
      },
      {
        id: 'us-mortgage-differences',
        question: 'How are US mortgage calculations handled?',
        answer:
          'US mortgages are compounded monthly, which matches how most American lenders quote and charge interest. The calculator works with common US terms (such as 15- and 30-year loans) and includes property tax and homeowners insurance alongside the principal and interest payment, so the figure you see is closer to a full monthly housing cost than just the loan payment.',
      },
      {
        id: 'canada-mortgage-differences',
        question: 'Why do Canadian mortgage results look different?',
        answer:
          'In Canada, interest on most fixed-rate mortgages is compounded semi-annually by law, even when the rate is quoted annually. That subtle difference makes a real impact on the effective rate and the payment. The calculator applies semi-annual compounding for Canada and also models Canadian down-payment rules and CMHC mortgage insurance when your down payment is below 20%.',
      },
      {
        id: 'australia-mortgage-differences',
        question: 'How are Australian mortgages handled?',
        answer:
          'Australian home loans are typically compounded monthly, and the calculator applies that convention for AU. It also estimates stamp duty based on the property price and the Australian state you select, and reflects AUD throughout. Australian-specific rules are applied so the result matches how lenders in Australia actually structure payments.',
      },
      {
        id: 'what-is-cmhc',
        question: 'What is CMHC insurance?',
        answer:
          'CMHC is Canada\u2019s mortgage default insurance, required when your down payment is between 5% and 19.99% of the home price. The premium is a percentage of the loan amount that depends on your down payment tier — roughly 4% at a 5% down payment, stepping down as your down payment grows, and dropping to 0% once you put 20% or more down. The calculator works out the applicable premium and shows it as a one-time cost.',
      },
      {
        id: 'what-is-stamp-duty',
        question: 'What is stamp duty?',
        answer:
          'Stamp duty (transfer duty) is a state-level tax paid when a property changes hands in Australia. It is typically calculated as a percentage of the purchase price, with rates and thresholds that vary by state. The Australian calculator lets you pick a state and includes an estimated stamp-duty cost based on the property price, so your upfront picture includes this major out-of-pocket expense.',
      },
      {
        id: 'taxes-and-insurance',
        question: 'Are property taxes and insurance included?',
        answer:
          'Where they are part of typical housing costs, yes. The US calculator adds estimated property tax and homeowners insurance to your payment. The Canadian and Australian calculators focus on the local costs that apply there, such as CMHC insurance and stamp duty. You can adjust these amounts, and they are clearly broken out from principal and interest so you can see what you are actually paying for.',
      },
      {
        id: 'extra-payments-and-amortization',
        question: 'Can I see extra payments, amortization, and export results?',
        answer:
          'Yes. The mortgage calculator supports extra payments and shows the impact on interest and loan term. You can view a period-by-period amortization schedule, explore interactive charts of balance and payments, export the schedule to CSV, print a clean copy, and share the exact scenario through a copyable link. Everything stays in your browser.',
      },
      {
        id: 'mortgage-accuracy',
        question: 'How accurate are the mortgage results?',
        answer:
          'The mathematics follows the standard amortization formulas used by lenders, and the country rules (compounding, CMHC, stamp duty) mirror official guidelines. However, real quotes depend on your lender, credit profile, and the precise day of pricing. Treat the results as a high-quality estimate for planning and comparison — not a loan offer or approval. See the Disclaimer page for more detail.',
      },
    ],
  },
  {
    id: 'retirement',
    label: 'Retirement',
    description:
      'Projecting savings growth, inflation, income needs, and readiness.',
    items: [
      {
        id: 'retirement-calculator-basics',
        question: 'How does the Retirement Calculator work?',
        answer:
          'It projects the future value of your retirement savings. You enter your current age, target retirement age, current savings, monthly contribution, expected annual return, and inflation rate. The calculator compounds your existing balance and contributions year over year to show how much you could accumulate by retirement — both in nominal dollars and adjusted for inflation.',
      },
      {
        id: 'inflation-adjusted-value',
        question: 'What does the inflation-adjusted value mean?',
        answer:
          'Inflation erodes purchasing power, so a dollar at retirement is worth less than a dollar today. The calculator shows two figures: your projected balance in future (nominal) dollars, and the same balance expressed in today\u2019s purchasing power after applying the inflation rate you entered. Comparing the two makes it easier to judge whether a nominal target actually supports your lifestyle.',
      },
      {
        id: 'retirement-income-estimate',
        question: 'How is the retirement income estimate calculated?',
        answer:
          'Once you have a projected balance, the calculator estimates the sustainable monthly income it could support using a safe withdrawal rate — a standard assumption (for example, 4%) representing how much of a portfolio is commonly drawn each year without exhausting it. Your projected balance multiplied by that rate gives the annual income, which is divided into a monthly figure and checked against your retirement income goal.',
      },
      {
        id: 'retirement-assumptions',
        question: 'What assumptions are built into the retirement calculations?',
        answer:
          'The main assumptions are the expected annual return on your investments and the inflation rate. Both are editable, and they are educated defaults, not promises — markets do not return a fixed rate every year. Because you can change them, you can test optimistic, realistic, and conservative scenarios to see how sensitive your plan is to the assumptions.',
      },
      {
        id: 'pensions-and-government-benefits',
        question: 'Does the calculator include pensions or government benefits?',
        answer:
          'Not automatically. Plans like Social Security (US), CPP/QPP (Canada), or Age Pension / superannuation (Australia) are not built into the projection, because eligibility and amounts vary widely. Instead, you can account for them by adjusting your target retirement income: subtract the benefit income you expect, and enter the remainder as your goal.',
      },
      {
        id: 'goal-progress-and-readiness',
        question: 'What are "goal progress" and "readiness"?',
        answer:
          'Goal progress compares your projected retirement balance with the balance required to fund your income goal, shown as a percentage. Readiness is a judgement built on that comparison — whether you are on track, close, or behind. Both turn a large projection number into a clear, actionable signal about whether to increase contributions or adjust your target.',
      },
    ],
  },
  {
    id: 'net-worth',
    label: 'Net Worth',
    description:
      'Building a personal balance sheet: assets, liabilities, and the insights drawn from it.',
    items: [
      {
        id: 'net-worth-calculation',
        question: 'How is net worth calculated?',
        answer:
          'Net worth is simply total assets minus total liabilities. The calculator groups assets into categories — cash, investments, retirement accounts, real estate, vehicles, business assets, and other assets — and liabilities into mortgages, personal loans, auto loans, credit cards, student loans, and other debts. Subtract the second total from the first and you get your net worth, the single best snapshot of your financial position.',
      },
      {
        id: 'asset-allocation',
        question: 'What is the asset allocation breakdown?',
        answer:
          'The breakdown shows what your assets are made of by dividing each asset category by your total assets. Seeing that your wealth is concentrated in real estate rather than cash or investments, for example, can highlight concentration risk and where your money is actually working. The calculator presents these as proportions so you can gauge diversification at a glance.',
      },
      {
        id: 'debt-breakdown',
        question: 'What is the debt breakdown?',
        answer:
          'The debt breakdown splits your liabilities by type — mortgage, auto, credit cards, student loans, and so on — and shows each one\u2019s share of total debt. High-interest debt like credit cards tends to deserve the fastest payoff, while low-interest mortgage debt may be more manageable. The breakdown makes that trade-off visible instead of hiding it inside a single total.',
      },
      {
        id: 'financial-health-score',
        question: 'What is the financial health score?',
        answer:
          'The health score distills your balance sheet into a single number based on factors such as the ratio of assets to liabilities, how much of your wealth is tied up in a single asset class, and the mix of high-versus-low-cost debt. It is an educational tool designed to highlight strengths and opportunities — not a credit score and not a guarantee about anything.',
      },
      {
        id: 'financial-insights',
        question: 'What are the financial insights?',
        answer:
          'Insights are short, plain-language observations generated from your inputs — for example, that high-interest debt is a large share of your liabilities, or that a big portion of your assets sits in real estate. They are meant to prompt useful questions about your situation, and every claim they make is derived directly from the numbers you entered.',
      },
      {
        id: 'net-worth-currencies',
        question: 'Can net worth be viewed in different currencies?',
        answer:
          'Yes. The Net Worth Calculator lets you choose a display currency (USD, CAD, or AUD) so you can review your balance sheet in the currency that makes sense to you, using the same currency service that powers the other calculators. Your inputs are always interpreted in the country\u2019s native currency and converted only for display.',
      },
    ],
  },
  {
    id: 'currency',
    label: 'Currency & Calculations',
    description:
      'How exchange rates work, where they come from, and when they refresh.',
    items: [
      {
        id: 'currency-conversion-basics',
        question: 'How does currency conversion work on CalcVantage?',
        answer:
          'A shared currency service handles every conversion across the platform. Each calculator keeps its country\u2019s native currency (USD, CAD, or AUD) for the actual math, and converts only the displayed results when you pick a different currency. Conversions use up-to-date exchange rates supplied by the Frankfurter API, so the numbers you see are consistent whichever calculator you use.',
      },
      {
        id: 'what-is-frankfurter',
        question: 'What is the Frankfurter API and where do the rates come from?',
        answer:
          'Frankfurter is a free, open-source exchange-rate API that republishes the European Central Bank\u2019s daily reference rates — the same reference rates used by many financial institutions. It requires no API key and no account. That independence and simplicity are why we chose it: the rate data is authoritative and the service stays free to run.',
      },
      {
        id: 'rate-refresh-cache',
        question: 'How often are exchange rates refreshed?',
        answer:
          'The ECB publishes reference rates once per business day, and CalcVantage checks for fresh rates only as needed. A successful rate fetch is cached — in memory for the current session and in your browser\u2019s local storage — for up to 12 hours. Within that window, returning visitors reuse the cached snapshot instead of making repeated network calls, which keeps the site fast.',
      },
      {
        id: 'rates-unavailable-fallback',
        question: 'What happens if the exchange-rate service is unavailable?',
        answer:
          'If the Frankfurter API cannot be reached, the calculator first tries any cached rates it already has — even if they are slightly stale — rather than failing. Only when no cached copy exists does it fall back to built-in reference rates so the calculators keep working offline or during an outage. You will see a small status note when this happens.',
      },
      {
        id: 'supported-currencies',
        question: 'Which currencies are supported?',
        answer:
          'The platform is built around USD, CAD, and AUD — the native currencies of the United States, Canada, and Australia. You can switch the display currency between these three on any calculator, and conversions are derived from the ECB reference rates described above.',
      },
      {
        id: 'calculation-accuracy',
        question: 'How accurate are the financial calculations?',
        answer:
          'The core formulas follow standard financial mathematics — amortization for mortgages, future-value compounding for retirement, and a simple balance sheet for net worth — with country-specific rules applied where they exist. Results are rounded for display but computed at full precision internally. As with any tool, the outputs are only as good as the assumptions you enter, so we encourage you to review the assumptions sections on each calculator.',
      },
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy',
    description:
      'What we collect, what stays on your device, and the boundaries of our advice.',
    items: [
      {
        id: 'data-privacy',
        question: 'Is my financial data stored or shared?',
        answer:
          'No. The numbers you enter into any calculator are processed on your own device and are never transmitted to, stored on, or shared by our servers. We do not require an account, and we do not sell personal information. The full picture is documented in the <a href="/privacy-policy">Privacy Policy</a>.',
      },
      {
        id: 'cookies-and-storage',
        question: 'Does CalcVantage use cookies?',
        answer:
          'CalcVantage uses only minimal cookies and local storage, and only as described in our <a href="/cookie-policy">Cookie Policy</a>. A small amount of local storage helps the site remember lightweight preferences — such as cached exchange rates — so you do not have to re-fetch them. You can clear cookies or storage at any time in your browser without affecting the calculators.',
      },
      {
        id: 'sharing-results',
        question: 'Can I share my results without exposing personal data?',
        answer:
          'Yes. The share-link feature encodes your calculator inputs into the URL itself, so a friend or colleague can open the same scenario. The numbers travel in the link you choose to share — nothing is uploaded to us and nothing is stored centrally. Share carefully, the same way you would with any financial information.',
      },
      {
        id: 'financial-advice-disclaimer',
        question: 'Is the information on CalcVantage financial advice?',
        answer:
          'No. CalcVantage is an educational tool, not a financial advisor. The calculators provide estimates based on the assumptions you enter, and the content is general information for the US, Canada, and Australia — it is not tailored to your personal situation and is not a recommendation to buy, sell, or hold any product. For decisions that matter, consult a qualified professional. See the <a href="/disclaimer">Disclaimer</a> for full terms.',
      },
    ],
  },
];