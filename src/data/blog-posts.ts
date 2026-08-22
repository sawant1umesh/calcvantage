import type { BlogPost } from '../types/blog';

const mortgageAmortizationContent = `
<h2>What Is Mortgage Amortization?</h2>
<p>Mortgage amortization is the process of paying off a home loan through regular, scheduled payments over a set period. Each payment covers both <strong>principal</strong> (the amount you originally borrowed) and <strong>interest</strong> (the cost of borrowing that money). Over time, the balance between these two shifts.</p>
<p>Here are the core parts of an amortizing mortgage:</p>
<ul>
  <li><strong>Principal:</strong> The original loan amount. Every dollar of principal you pay down reduces what you owe.</li>
  <li><strong>Interest:</strong> The lender's charge for letting you borrow money. It is calculated as a percentage of your remaining loan balance.</li>
  <li><strong>Loan term:</strong> The length of time you have to repay the loan in full. Common terms in the US are 15 years and 30 years.</li>
  <li><strong>Regular payments:</strong> Fixed monthly amounts that stay the same throughout the loan, but whose internal split between principal and interest changes with every payment.</li>
  <li><strong>Gradual balance reduction:</strong> With each payment, the outstanding balance decreases, which in turn reduces the interest charged in future periods.</li>
</ul>
<p>The key idea behind amortization is that a single fixed payment quietly does two jobs at once, and the ratio between those jobs changes month by month. If you want a broader overview of what else goes into a monthly housing payment beyond principal and interest, see our guide to <a href="/blog/understanding-mortgage-payments">understanding mortgage payments</a>.</p>

<h2>How Mortgage Amortization Works</h2>
<p>When you take out a fixed-rate mortgage, the lender calculates a single monthly payment that will fully pay off the loan over the agreed term. That payment never changes. What does change is how much of it goes to interest versus principal.</p>
<p>Here is the step-by-step process:</p>
<ol>
  <li><strong>The lender calculates interest on the remaining balance.</strong> At the start of each month, the outstanding loan balance is multiplied by the monthly interest rate (annual rate divided by 12). This gives you the interest portion of that month's payment.</li>
  <li><strong>The rest of the payment goes toward principal.</strong> Whatever is left after covering interest reduces the outstanding balance.</li>
  <li><strong>The balance shrinks.</strong> Because you paid down some principal, the next month's interest is calculated on a slightly smaller number. This means a slightly larger share of the next payment can go toward principal.</li>
  <li><strong>The cycle repeats.</strong> Over hundreds of payments, this compounding effect gradually shifts the payment composition. Early payments are mostly interest. Later payments are mostly principal.</li>
</ol>
<p>This is not a trick or a hidden fee structure. It is simply how math works when you charge interest on a declining balance. The lender does not decide each month how to split your payment. The split is a mathematical result of the outstanding balance and the interest rate.</p>

<h2>Principal vs. Interest</h2>
<p>Every mortgage payment has two parts:</p>
<ul>
  <li><strong>Principal</strong> is the part that reduces your debt. When you make a principal payment, you own a little more of your home.</li>
  <li><strong>Interest</strong> is the cost of borrowing. It is how the lender earns a return on the money they loaned you.</li>
</ul>
<p>Think of it like renting money. The interest is the rent you pay for the privilege of using someone else's capital. The principal is the part that builds your equity.</p>
<p>Consider a simple example: you owe $300,000 at 6.5% annual interest. In the first month, the interest charge is roughly $1,625. If your total monthly payment is $1,896, that leaves only about $271 for principal. You paid nearly six times more in interest than in principal. A year later, the split is still heavily weighted toward interest, but it is slowly shifting.</p>

<h2>Example of a Mortgage Amortization Schedule</h2>
<p>Here is a realistic example using a common US mortgage scenario:</p>
<table>
  <thead>
    <tr>
      <th>Loan Detail</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Loan amount</td>
      <td>$300,000</td>
    </tr>
    <tr>
      <td>Annual interest rate</td>
      <td>6.5%</td>
    </tr>
    <tr>
      <td>Loan term</td>
      <td>30 years (360 monthly payments)</td>
    </tr>
    <tr>
      <td>Monthly principal and interest</td>
      <td>$1,896.20</td>
    </tr>
  </tbody>
</table>
<p>Over the full life of this loan, you would pay a total of approximately $682,633. That means roughly $382,633 goes to interest alone, in addition to the original $300,000 in principal.</p>
<p>Now look at how the payment splits change at different points during the loan:</p>
<table>
  <thead>
    <tr>
      <th>Payment</th>
      <th>Monthly Payment</th>
      <th>Interest</th>
      <th>Principal</th>
      <th>Remaining Balance</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1 (Month 1)</td>
      <td>$1,896.20</td>
      <td>$1,625.00 (85.7%)</td>
      <td>$271.20 (14.3%)</td>
      <td>$299,728.80</td>
    </tr>
    <tr>
      <td>12 (Year 1)</td>
      <td>$1,896.20</td>
      <td>$1,608.40 (84.8%)</td>
      <td>$287.81 (15.2%)</td>
      <td>$296,646.82</td>
    </tr>
    <tr>
      <td>60 (Year 5)</td>
      <td>$1,896.20</td>
      <td>$1,523.20 (80.3%)</td>
      <td>$373.01 (19.7%)</td>
      <td>$280,832.93</td>
    </tr>
    <tr>
      <td>120 (Year 10)</td>
      <td>$1,896.20</td>
      <td>$1,380.41 (72.8%)</td>
      <td>$515.80 (27.2%)</td>
      <td>$254,328.38</td>
    </tr>
    <tr>
      <td>180 (Year 15)</td>
      <td>$1,896.20</td>
      <td>$1,182.95 (62.4%)</td>
      <td>$713.25 (37.6%)</td>
      <td>$217,677.42</td>
    </tr>
    <tr>
      <td>300 (Year 25)</td>
      <td>$1,896.20</td>
      <td>$532.33 (28.1%)</td>
      <td>$1,363.87 (71.9%)</td>
      <td>$96,912.49</td>
    </tr>
    <tr>
      <td>360 (Year 30)</td>
      <td>$1,896.20</td>
      <td>$10.22 (0.5%)</td>
      <td>$1,885.99 (99.5%)</td>
      <td>$0.00</td>
    </tr>
  </tbody>
</table>
<p>Notice the pattern: the total payment stays at $1,896.20 every single month. But in payment 1, over 85% goes to interest. By the final payment, virtually the entire amount goes to principal.</p>

<h2>Why You Pay More Interest at the Beginning</h2>
<p>This is one of the most common questions borrowers have, and the answer is straightforward: interest is calculated on what you still owe.</p>
<p>When you first take out a $300,000 loan at 6.5%, the monthly interest is based on that full $300,000 balance. At 6.5% annually, that works out to roughly $1,625 in the first month. The remaining portion of your payment then goes toward principal.</p>
<p>As you make payments and the balance decreases, the interest charge drops too. After one year of payments, the balance has fallen to about $296,647. The monthly interest on that smaller balance is about $1,608. The difference is small at first, but it accelerates over time because each principal payment makes the next interest charge smaller.</p>
<p>This is not because the lender front-loads interest or because the rate changes. It is a direct consequence of the math. A percentage of a large number is larger than the same percentage of a small number. As the loan balance shrinks, the interest naturally shrinks with it.</p>

<h2>How the Amortization Schedule Changes Over Time</h2>
<p>The shift from interest-heavy to principal-heavy payments does not happen at a constant pace. It follows a curve.</p>
<h3>Early years (payments 1–60)</h3>
<p>The balance is at its highest, so interest charges dominate. In the first five years of our example, roughly 80–86% of each payment goes to interest. Principal progress is slow. After five years of payments on a $300,000 loan, you have only reduced the balance to about $280,833, meaning you have paid roughly $19,167 in principal.</p>
<h3>Middle of the loan (payments 120–240)</h3>
<p>The curve begins to bend. By year 10, about 27% of each payment goes to principal. By year 15, that share rises to roughly 38%. The balance is declining faster, and the momentum builds.</p>
<h3>Final years (payments 300–360)</h3>
<p>The balance is now small enough that interest charges are modest. By year 25, over 70% of each payment goes to principal. In the last year, nearly the entire payment reduces the balance. The final payment of $1,896.20 includes only about $10 in interest.</p>

<h2>What Happens If You Make Extra Mortgage Payments?</h2>
<p>One of the most powerful strategies for reducing the cost of a mortgage is making extra payments toward principal. Because interest is calculated on the outstanding balance, every extra dollar you pay toward principal reduces the balance immediately. This means:</p>
<ul>
  <li><strong>Lower interest charges in future months.</strong> A smaller balance generates less interest, which frees up more of each regular payment for principal.</li>
  <li><strong>A shorter loan term.</strong> By paying ahead of schedule, you can pay off the loan years earlier than the original 30-year term.</li>
  <li><strong>Significant total savings.</strong> Reducing the balance faster means paying less interest over the life of the loan.</li>
</ul>
<p>For example, adding just $200 per month in extra principal payments on the $300,000 loan described above could reduce the loan term by several years and save tens of thousands of dollars in interest. The exact savings depend on your loan terms, interest rate, and how consistently you make the extra payments.</p>
<p>Before making extra payments, check with your lender about any prepayment rules. Some loans have prepayment penalties, and some lenders require that extra payments be applied in a specific way. In most cases, US conventional mortgages do not have prepayment penalties, but it is worth confirming.</p>

<h2>How Interest Rate and Loan Term Affect Amortization</h2>
<p>Two variables have the greatest impact on how amortization plays out: the interest rate and the loan term.</p>
<h3>15-year vs. 30-year mortgage</h3>
<p>A shorter loan term means higher monthly payments but significantly less interest over time. Using the same $300,000 loan at 6.5%:</p>
<table>
  <thead>
    <tr>
      <th>Detail</th>
      <th>30-Year Mortgage</th>
      <th>15-Year Mortgage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Monthly payment</td>
      <td>$1,896.20</td>
      <td>$2,613.32</td>
    </tr>
    <tr>
      <td>Total interest paid</td>
      <td>$382,633</td>
      <td>$170,398</td>
    </tr>
    <tr>
      <td>Interest savings</td>
      <td>—</td>
      <td>$212,235</td>
    </tr>
  </tbody>
</table>
<p>The 15-year mortgage costs $717 more per month, but saves over $212,000 in interest. The trade-off is between monthly affordability and total cost.</p>
<h3>Lower vs. higher interest rates</h3>
<p>Even small differences in interest rates have a large effect over 30 years. A 0.5% rate change on a $300,000 loan can mean the difference of tens of thousands of dollars in total interest. Higher rates also mean a larger share of early payments goes to interest, slowing down equity growth in the early years.</p>

<h2>How to Use a Mortgage Calculator</h2>
<p>A mortgage calculator helps you estimate your monthly payment, total interest, and amortization behavior without needing to run the numbers by hand. With the right calculator, you can:</p>
<ul>
  <li>See how your monthly principal and interest payment changes with different loan amounts, rates, and terms.</li>
  <li>Compare the total cost of a 15-year mortgage versus a 30-year mortgage.</li>
  <li>Model the effect of extra payments on your loan balance and payoff timeline.</li>
  <li>Understand how much of your early payments would go to interest versus principal.</li>
</ul>
<p>Our <a href="/mortgage">Mortgage Calculator</a> lets you run these scenarios for properties in the US, Canada, and Australia, with country-specific details like CMHC insurance for Canadian buyers and stamp duty considerations for Australian properties. It also generates a full amortization schedule so you can see the payment-by-payment breakdown for your specific loan. If you are preparing to apply for a mortgage, our <a href="/blog/homebuyer-first-mortgage">first-time homebuyer checklist</a> covers what to have ready before you contact a lender.</p>

<h2>Frequently Asked Questions</h2>
`;

const mortgageAmortizationFaqs = [
  {
    question: 'What does mortgage amortization mean?',
    answer: 'Mortgage amortization means repaying a home loan through scheduled, regular payments that cover both principal and interest over a set period. With each payment, a portion reduces the loan balance while the rest covers the interest charge. Over time, the share going to principal increases as the outstanding balance decreases.',
  },
  {
    question: 'Why does more of my mortgage payment go toward interest at first?',
    answer: 'Interest is calculated on the remaining loan balance. When the balance is at its highest at the start of the loan, the interest charge is also at its highest. As you pay down the balance, the interest portion shrinks and more of each payment goes toward principal. This is a natural result of the math, not a hidden fee.',
  },
  {
    question: 'Does every mortgage have an amortization schedule?',
    answer: 'Most fixed-rate mortgages in the US, Canada, and Australia use amortization. Some loan types, such as interest-only mortgages or adjustable-rate mortgages with interest-only periods, do not amortize during the interest-only phase. However, the standard fixed-rate mortgage, which is the most common product, is fully amortizing.',
  },
  {
    question: 'Can extra mortgage payments shorten the loan?',
    answer: 'Yes. Making additional payments toward principal reduces the outstanding balance faster, which lowers future interest charges and can shorten the loan term by several years. The exact impact depends on the amount, frequency, and consistency of the extra payments, as well as your lender\'s policies.',
  },
  {
    question: 'Is a 15-year mortgage better than a 30-year mortgage?',
    answer: 'It depends on your financial situation. A 15-year mortgage saves a significant amount in interest and builds equity faster, but the monthly payments are higher. A 30-year mortgage has lower monthly payments, making it more affordable month-to-month, but costs more in total interest over the life of the loan.',
  },
  {
    question: 'How can I see my mortgage amortization schedule?',
    answer: 'Most lenders provide an amortization schedule at closing. You can also generate one using a mortgage calculator. Our Mortgage Calculator produces a full amortization schedule showing the principal, interest, and remaining balance for every payment over the life of the loan.',
  },
  {
    question: 'Does the interest rate affect mortgage amortization?',
    answer: 'Yes. A higher interest rate means a larger portion of each early payment goes to interest, which slows down principal reduction. A lower rate means more of each payment goes to principal from the start. Even small rate differences can result in tens of thousands of dollars in additional interest over a 30-year term.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'understanding-mortgage-payments',
    title: 'Understanding Mortgage Payments: What Really Goes Into Your Monthly Bill',
    excerpt:
      'A mortgage payment is more than the loan itself. Property tax, insurance, and other costs all add up. Here is how each part works and why it matters for your budget.',
    category: 'mortgage',
    readingTime: 7,
    pubDate: '2026-08-16',
    author: 'CalcVantage Team',
    popular: true,
  },
  {
    slug: 'retirement-savings-guide',
    title: 'How Much Should You Save for Retirement? A Practical Starting Point',
    excerpt:
      'The right savings rate depends on your goals, timeline, and expected returns. Walk through a realistic framework to turn a big number into a plan you can act on.',
    category: 'retirement',
    readingTime: 8,
    pubDate: '2026-08-16',
    author: 'CalcVantage Team',
    popular: true,
  },
  {
    slug: 'net-worth-basics',
    title: 'Net Worth Basics: Why One Number Paints the Whole Financial Picture',
    excerpt:
      'Add up your assets, subtract your liabilities, and you get a single snapshot of your money. Learn what belongs on each side and how often you should recalculate.',
    category: 'net-worth',
    readingTime: 5,
    pubDate: '2026-08-16',
    author: 'CalcVantage Team',
  },
  {
    slug: 'emergency-fund-size',
    title: 'Building an Emergency Fund: How Much Is Actually Enough?',
    excerpt:
      'Three months or six? The right emergency fund size depends on your income stability, expenses, and risk tolerance. Here is how to pick a target that fits.',
    category: 'saving',
    readingTime: 6,
    pubDate: '2026-08-16',
    author: 'CalcVantage Team',
    popular: true,
  },
  {
    slug: 'homebuyer-first-mortgage',
    title: 'First-Time Homebuyer Checklist: What to Prepare Before You Apply',
    excerpt:
      'From credit score to closing costs, the steps before a mortgage application set the stage. Use this checklist to walk in ready and avoid common surprises.',
    category: 'mortgage',
    readingTime: 9,
    pubDate: '2026-08-16',
    author: 'CalcVantage Team',
  },
  {
    slug: 'budgeting-methods-compared',
    title: 'Budgeting Methods Compared: 50/30/20 vs. Zero-Based vs. Envelope',
    excerpt:
      'Not every budget fits every lifestyle. Compare three popular budgeting methods side by side to find the one you can realistically stick with.',
    category: 'budgeting',
    readingTime: 6,
    pubDate: '2026-08-16',
    author: 'CalcVantage Team',
  },
  {
    slug: 'mortgage-amortization-explained',
    title: 'Mortgage Amortization Explained: How Your Payments Change Over Time',
    excerpt:
      'Your fixed mortgage payment contains different proportions of principal and interest each month. Learn how amortization works, why early payments are interest-heavy, and how extra payments can save you money.',
    subtitle: 'Understanding the mechanics behind your monthly mortgage payment',
    category: 'mortgage',
    readingTime: 9,
    pubDate: '2026-08-22',
    author: 'CalcVantage Team',
    featured: true,
    popular: true,
    content: mortgageAmortizationContent,
    faqs: mortgageAmortizationFaqs,
    seo: {
      title: 'Mortgage Amortization Explained: How It Works | CalcVantage',
      description:
        'Learn how mortgage amortization works, how principal and interest change over time, and how to read an amortization schedule with a simple example.',
    },
  },
];