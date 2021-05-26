import HeaderLayout from 'containers/components/layout/Header';
import {LoadingProvider} from 'containers/hooks/loadingProvider';
import React, {useState} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {ROUTE_PATH} from 'routers/helpers';
import './styled.css';

const TermOfUseComponent = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const cbOpenLogin = () => setOpenLogin(false);

  const cbOpenRegister = () => setOpenRegister(false);

  return (
    <LoadingProvider>
      <Scrollbars
        style={{
          height: '100vh',
          display: 'block',
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/background.jpg)`,
        }}>
        <header>
          <HeaderLayout
            noBackground={true}
            openLogin={openLogin}
            openRegister={openRegister}
            cbOpenLogin={cbOpenLogin}
            cbOpenRegister={cbOpenRegister}
          />
          <div className="content-header d-block">
            <div className="container">
              <div className="title text-center">
                <h2>Terms and Conditions</h2>
                <p>Retail client agreement</p>
                <h4>
                  These terms of Use below are transacted between you (hereinafter referred to as “you” or “your”) and
                  Finimix creators. By accessing, using or clicking on “I agree/ I understand” to accept any services
                  provided by Finimix , you agree that you have read, understood and acknowledged and accepted all of
                  the terms and conditions in these Terms of Use (hereinafter referred to as “these Terms”) as well as
                  our Privacy Policy. Besides, when using some features of the Services, you may be subject to specific
                  additional terms and conditions applicable to those features.
                </h4>
                <h4>
                  For your benefit, we strongly recommend that you should spend enough time to read the terms and
                  conditions together with other policies and agreements available carefully prior to accepting the
                  terms and conditions, and/or opening a trading account, and/or performing any transactions. If you do
                  not accept these terms and conditions, please do not use the site, and/or opening an account. Your use
                  of the Site constitutes acceptance of these terms and conditions.
                </h4>
                <br />
                <br />
                <p>1. General Provisions</p>
                <h4>a. Contractual relationship</h4>
                <span>
                  These Terms constitute a legal agreement and create a binding contract between you and Finimix.
                </span>
                <br />
                <br />
                <h4>b. Supplementary terms</h4>
                <span>
                  Due to the rapid development of Digital Currencies and Finimix, these Terms between you and Finimix
                  Operators do not enumerate or cover all rights and obligations of each party, and do not guarantee
                  full alignment with needs arising from future development. Therefore, the privacy policy and all other
                  agreements entered into separately between you and me are deemed supplementary terms that are an
                  integral part of these terms and shall have the same legal effect. Your use of services is deemed your
                  acceptance of the above supplementary terms
                </span>
                <br />
                <br />
                <h4>c. Changes to these terms</h4>
                <span>
                  We reserve the right to change or modify these Terms in its discretion at any time. We will notify
                  such changes by updating the terms on its website and modifying the [Last revised] date displayed on
                  this page. Any modifications or changes to these terms will become effective upon publication on the
                  website or release to users. Therefore, your continued use of services is deemed your acceptance of
                  the modified agreement and rules. If you do not agree to any changes to these terms, you must stop
                  using services immediately. You are recommended to frequently review these terms to ensure your
                  understanding of the terms and conditions that apply to your access to and use of services.
                </span>
                <br />
                <br />
                <h4>d. Prohibition of Use</h4>
                <span>
                  The Client is prohibited and shall not, under no circumstances, be allowed to execute any
                  transactions/Operations on the Trading Platform, Website and/or through his/her Account, that would as
                  a result exceed the total balance and/or amount of money deposited/maintained with his/her Account.
                  Such deposited amounts shall be considered to have been provided as collateral, either in the form of
                  a lien or otherwise, to the Company by the Client by which the obligation of the Client to pay any
                  money to the Company is secured.
                </span>
                <br />
                <br />
                <p>2. Terms</p>
                <span>
                  - Account – means a unique personified account registered in the name of the Client and which
                  contains all of the Client’s transactions/ operations on the Trading Platform (as defined below) of
                  the Company.
                </span>
                <span>- Ask - means the higher price in a quote. The price the Client may buy at.</span>
                <span>- Bid - means the lower price in a quote. The price the Client may sell at.</span>
                <span>
                  - CFD (contract for difference) - means a tradeable contract entered into between the Client and the
                  Company, who exchange the difference in the value of an Instrument, as specified on the Trading
                  Platform at the time of opening a Transaction, and the value of that Instrument at the contract’s end.
                </span>
                <span>
                  - Digital Option Contract - means a type of derivative instrument where the Client earns a payout if
                  they correctly predict the price movement of the underlying asset at the time of the option’s expiry.
                  The prediction can be made as to whether the value of the underlying asset will fall above or below
                  the strike price at time of expiration. Should the option expire at the selected strike price, it will
                  be considered to expire out-of-the money and will result in the loss of the invested amount.
                </span>
                <span>
                  - Execution - means the execution of Client order(s) by the Company acting as the Client's
                  counterparty as per the terms of the present agreement.
                </span>
                <span>
                  - Market - means the market on which the Financial Instruments are subject to and/or traded on
                </span>
                <span>
                  - Market Maker - means a company which provides BID and ASK prices for financial instruments.
                </span>
                <span>
                  - Operations – means actions performed at the Client’s Account, following an order placed by the
                  Client,, connected with but not limited to crediting of funds, return of funds, opening and closing of
                  trade transactions/positions and/or that relate to financial instruments.
                </span>
                <span>
                  - Prices - means the prices offered to the Client for each transaction which may be changed without
                  prior notice. Where this is relevant, the “Prices” given through the Trading Platform include the
                  Spread (see definition below).
                </span>
                <span>
                  - Trading Platform - means an electronic system on the internet that consists of all programs and
                  technology that present quotes in real-time, allow the placement/modification/deletion of orders and
                  calculate all mutual obligations of the Client and the Company.
                </span>
                <span>
                  - A Demo Account - a virtual account for the Client on the Trading Platform, reflecting in real time
                  the results of their Trading Operations on that account. The currency of the Demo Account always
                  matches the currency of the Client's Real Account. Demo Account funds are not a financial obligation
                  of the Company to the Client.
                </span>
                <span>
                  - Withdrawal of Funds - the debiting of monetary funds from the Account and transfer thereof to the
                  Client's account.
                </span>
                <br />
                <br />
                <p>3. Trading mechanisms</p>
                <span>The trading platform provides the following trading mechanisms to the Client:</span>
                <span>
                  - When opening a Trade, the Client indicates the Asset, the amount invested by the Client in the
                  Trade, the direction of the chart movement and when the Trade will close.
                </span>
                <span>- The trade will close when the selected closing time is reached.</span>
                <span>
                  - If at the time of closing the Trade, the Quote of the selected Asset at the moment is higher than
                  the Quote at the time of opening the Trade, the Trade is considered profitable if the direction of the
                  selected chart's movement is "up". If at the time of closing the Trade, the Quote of the selected
                  Asset at the moment is lower than the Quote at the time of opening the Trade, the Trade is considered
                  profitable if the direction of the movement of the selected chart is "down".
                </span>
                <span>
                  - The rate of return of the Trade is fixed and depends on the amount invested by the Client in the
                  Trade, the Asset and the execution time of the Trade. Profit from Trades is determined by multiplying
                  the rate of return (in percent) by the amount invested by the Client in the Trade.
                </span>
                <span>e. The trade closes at the time of closing the selected Trade.</span>
                <span>
                  - The Profit Rate of the Trade is fixed and depends on the amount invested by the Client in the
                  Trade, the Asset, the Strike Price, the direction of the chart movement and the execution time of the
                  Trade. Profit from Trades is determined by multiplying the rate of return (in percent) by the amount
                  invested by the Client in the Trade.
                </span>
                <span>
                  - Trades can be closed before the specified time. Early strike prices are dynamically calculated and
                  change according to market conditions.
                </span>
                <span>- Trading mechanism "CFD" is only applicable to Demo Accounts.</span>
                <span>
                  - When opening a Trade, the Client indicates the Asset, the amount invested by the Client in the
                  Trade, the Multiplier and the direction of the chart movement.
                </span>
                <span>
                  - Finimix is ​​a 24/7 exchange with no fixed time frame. Time for 1 session is 30s. At the end of
                  30s, the trading session will close and show the profit/loss that the player received
                </span>
                <span>
                  - Profit from Trading is calculated according to the following formula: Amount invested by Client in
                  Trade x 95% rate. (The profit margin at Finimix is ​​fixed 95%)
                </span>
                <span>- Customer Demo Account is completely free.</span>
                <span>
                  - If at the time of closing the Trade, the Current Price of the Selected Asset is higher than the
                  Price at the time of opening the Trade, then the Trade is considered profitable if the Client predicts
                  the Trade to move in the "bullish" direction. If at the time of closing the Trade, the Current Price
                  of the Selected Asset is lower than the Price at the time of opening the Trade, then the Trade is
                  considered profitable if the Client predicts the Trade to move in the "downward" direction.
                </span>
                <span>
                  - In the "CFD" trading mechanism, the Loss amount from the Trade does not exceed 100% of the amount
                  invested by the Client in the Trade.
                </span>
                <br />
                <br />
                <p>4. Procedures for making transactions</p>
                <span>
                  - The process of handling Customer Transaction Requests takes place in the following order:
                </span>
                <span>
                  - The Client makes a Trading Request, which is then checked for accuracy on the Trading Platform.
                </span>
                <span>
                  - From the Trading Platform, the Client's Trade Request is transmitted to the Server, where the
                  Trade Request is rechecked.
                </span>
                <span>
                  - Once checked again, the Trade Request is processed on the Server and the results of the
                  processing are transmitted to the Trading Platform.
                </span>
                <span>
                  - The processing time of the Client's Trade Request depends on the quality of the connection
                  between the Trading Platform and the Server, as well as the market conditions. Under normal market
                  conditions, the Client's Transaction Request processing time ranges from 0-3 seconds. Under unusual
                  market conditions, the processing time of the Client's Trade Request may be lengthy.
                </span>
                <span>- Open Trades</span>
                <span>
                  - The minimum amount the Client can invest in a Transaction on the Trading Platform is $1/ or the
                  equivalent of $1 (depending on the currency of the Account)
                </span>
                <span>
                  - A Client's Transaction Request to open a Trade will be refused for the following reasons: - The
                  Client makes a Trade Request before receiving the first quote of the Trading Asset on the Trading
                  Platform at the opening of the market; - The Client does not have enough money left in the Account to
                  open a new Transaction.
                </span>
                <span>
                  - The Client's request to open a Trade may also be rejected by the Server under unusual market
                  conditions.
                </span>
                <span>
                  - A Client's transaction request to open a Transaction is deemed executed, and Open, after a
                  corresponding record appears in the Log File. Each Transaction on the Server is attached with a unique
                  identification number.
                </span>
                <span>- Closed transactions</span>
                <span>
                  - The Trade closes with the Current Price of the Trading Asset on the Server at the time of
                  closing the Trade.
                </span>
                <span>
                  - The Client's transaction request to close a Transaction is considered completed and the
                  Transaction closed, after a corresponding record appears in the log file.
                </span>
                <span>
                  - The Company reserves the right to limit the maximum number of Transactions that the Client makes
                  in one minute, one hour or one calendar day.
                </span>
                <span>
                  - The Company reserves the right to change the rate of return, the minimum and maximum limits of
                  the amount the Client can invest in a Transaction, as well as the Expiry Time of one/many/all Assets.
                </span>
                <br />
                <br />
                <p>5. Terms of Use for the Company’s Services</p>
                <span>
                  - Services – services provided by the Company to the Client through the Trading Platform of the
                  Company, including without limitation to customer, analytics, news and marketing information services.
                </span>
                <span>
                  - The Company shall facilitate the execution of trade activities/orders and/or transactions of the
                  Client but the Client hereby acknowledges and accepts that the Company shall not at any time provide
                  any trust services and/or trading consultation or advisory services to the Client.
                </span>
                <span>
                  - The Company shall process all transactions/Operations of the Client in accordance with the terms
                  and conditions of this Agreement and on an execution-only basis. The Company shall not manage the
                  Client’s Account nor advise the Client in any way.
                </span>
                <span>
                  - The Company shall process the orders/transactions requested by the Client under this Agreement
                  irrespective of whether such orders/transactions may result to not being beneficial for the Client.
                  The Company is under no obligation, unless otherwise agreed in this Agreement and/or other
                  documentation/information on the Website, to monitor or advise the Client on the status of any
                  transaction/order, to make margin calls to the Client, or to close out any of the Client’s open
                  positions.
                </span>
                <span>
                  - The Company shall not be financially liable for any operations conducted by the Client through the
                  Account and/or on the Trading Platform.
                </span>
                <span>
                  - The Client shall be liable for all orders given through his security information and any orders
                  received in this manner by the Company shall be considered to have been given by the Client. So long
                  as any order is submitted through the Account of a Client, the Company shall reasonably assume that
                  such orders are submitted by Client and the Company shall not be under any obligation to investigate
                  further into the matter. The Company shall not be liable to and/or does not maintain any legal
                  relations with, any third party other than the Client.
                </span>
                <span>
                  - If the Client acts on behalf of any third party and/or on behalf of any third party’s name, the
                  Company shall not accept this person as a Client and shall not be liable before this person regardless
                  if such person was identified or not.
                </span>
                <span>
                  - The Client is entitled to use such Cancellation or Buyout option subject to the conditions
                  specified on the Trading Platform/Website, including without limitation to any fee to be charged by
                  the Company. The Company shall be obliged to provide all necessary information as to the conditions of
                  Cancellation and Buyout, including any applicable costs, etc. The Client acknowledges, accepts and
                  agrees that provision of such information on the Trading Platform is sufficient. The Client
                  acknowledges, accepts and agrees that the use of Cancellation or Buyout option entail large risks for
                  the Client, especially in the case where the costs associated with Cancellation and/or Buyout, depend
                  on the market situation. The Client acknowledges, accepts and agrees that he/she shall bear all risks
                  associated with the use of Cancellation and/or Buyout option.
                </span>
                <span>
                  - Provision of investment advice shall only be carried out by the Company subject to a separate
                  written agreement with the Client and after assessing the Client’s personal circumstances. Unless such
                  written agreement has been entered into between the Client and the Company, the provision of reports,
                  news, opinions and any other information by the Company to the Client does not constitute investment
                  advice or investment research.
                </span>
                <br />
                <br />
                <p>6. Rights and obligations of the parties</p>
                <h4>6.1. Client has a right</h4>
                <span>
                  - Perform Fixed Time Trades using the platform offered by the Company. to request and receive from us
                  any information regarding your Account.
                </span>
                <span>- Use funds available in his/her Account at any time at Client’s sole discretion.</span>
                <span>
                  - Make inquiries, give instructions and orders to the Company regarding the execution of Fixed Time
                  Trades as long as these are submitted through Client’ Account.
                </span>
                <span>
                  - In case of any disputes, to submit a complaint to the Company in a formal email through the email
                  address specified on the Site.
                </span>
                <h4>6.2. Client is obliged</h4>
                <span>
                  - Comply with the provisions of this Agreement when using Services offered by the Company and/or
                  performing Transactions on the Site and/or through Mobile App.
                </span>
                <span>
                  - Ensure that no other third party, including without limitation to any next of kin and/or to members
                  of his/her immediate family, shall gain access to and/or trade through the Account opened in Client’s
                  name.
                </span>
                <span>
                  - Take full responsibility for all transactions performed through Client’s account; and to accept risk
                  of possible financial loss of Client or Company resulted from unauthorized access to Client’s Account
                  by the third parties.
                </span>
                <span>
                  - Assume full responsibility in relation to any investment strategy or transaction, and for any
                  consequences brought by or from any transaction that Client performs.
                </span>
                <span>
                  - Not to duplicate, reproduce, summarize, or otherwise disclose the Company’s confidential information
                  to any person without prior express written consent of the Company.
                </span>
                <span>
                  - Register on the Site only one (1) Account. If the Company discovers that Client has multiple
                  Accounts opened, the Company reserves the right to terminate this Agreement, block all Client’s
                  Accounts, and retain all profits earned.
                </span>
                <span>
                  - Not to open, directly or indirectly, any new accounts with the Company if Client’s current account
                  has been suspended or blocked by the Company.
                </span>
                <h4>6.3. The Company has a right</h4>
                <span>
                  - Modify or update any provision of this Agreement at any time for any reason and any such changes to
                  this Agreement will supersede and replace any previous provisions of this Agreement effective
                  immediately upon posting on the Site.
                </span>
                <span>
                  - To change, add or set as default the return rate, profit rate, the minimum and/or the maximum trade
                  amount, the possible expiration periods for one, several or all of the assets. Company has the right
                  to limit the number of Fixed Time Trades placed during any period that appears on the trading
                  platform.
                </span>
                <span>- Revoke Client’s access to the Site at any time, where the Company deems necessary.</span>
                <span>
                  - Carry out additional checks and/or request additional documentation from Client before the Company
                  allows Client to resume any activity through the Account
                </span>
                <span>
                  - Utilize, at its sole discretion, a third party to hold Client’s funds and/or for purposes of
                  receiving payment execution services.
                </span>
                <span>
                  - Reject and immediately return funds deposited if the funds do not originate from a bank account
                  owned by Client.
                </span>
                <span>- Set limits on the amounts that Client can withdraw on a daily or other periodic basis.</span>
                <span>
                  - Reject the withdrawal request if Client’s Account does not have sufficient funds to satisfy Client’s
                  withdrawal request and to cover any applicable withdrawal fees.
                </span>
                <span>
                  - Temporarily or permanently suspend Client’s access to the Site and the Account, and/or terminate the
                  Agreement, and/or take any other actions as the Company may see fit under the circumstances.
                </span>
                <h4>6.4. The Company is obliged</h4>
                <span>- Act honestly, fairly, and professionally when providing Services to Clients.</span>
                <span>- Provide access to the Site and Client’s Account.</span>
                <span>
                  - Process Client’s withdrawal request within three (3) business days, provided that Client has
                  sufficient funds in Client’s Account to satisfy Client’s withdrawal request and to cover any
                  applicable withdrawal fees.
                </span>
                <br />
                <br />
                <p>7. Risk</p>
                <span>
                  The trading of goods and products, real or virtual, as well as virtual currencies involves significant
                  risk. Prices can and do fluctuate on any given day. Due to such price fluctuations, you may increase
                  or lose value in your assets at any given moment. Any currency - virtual or not - may be subject to
                  large swings in value and may even become worthless. There is an inherent risk that losses will occur
                  as a result of buying, selling or trading anything on a market.
                </span>
                <br />
                <br />
                <h4>7.1 Risks associated with trading financial instruments</h4>
                <span>
                  - Market Risk: Due to the high volatility of the Market, prices of most Financial Instruments traded
                  can vary considerably over the course of a day, which may bring you profit as well as loss. Those
                  Financial Instruments with volatile price movements should be carefully considered as there are higher
                  risks of loss. Prices may fluctuate due to changes in market conditions which is beyond your control
                  and that of the Company and it may not be possible for trades to be executed at the declared prices
                  resulting in losses. The volatility of the market can be affected by, but is not limited to, changes
                  in the supply & demand, national & international policy, geopolitical instability and
                  economical/political events or announcements.
                </span>
                <span>
                  - Liquidity Risk: This is the financial risk that for a certain period of time an underlying asset
                  cannot be traded quickly enough in the market without impacting the market price. You must acknowledge
                  that some products offered by the Company may suffer from liquidity strains due to adverse market
                  conditions, and as such, the asset may be volatile and have a higher degree of risk. The volatility
                  may be reflected in a larger spread between the ASK and BID prices, resulting in a change in the price
                  of the product.
                </span>
                <br />
                <br />
                <h4>7.2. Risks associated with cryptocurrency trading</h4>
                <span>
                  - Virtual currencies are complex and high risk products and as such, you could lose your entire
                  invested capital.
                </span>
                <span>
                  - Virtual currencies can widely fluctuate and may result in significant loss over a short period of
                  time. You should not trade in virtual currencies in case you do not have the necessary knowledge and
                  expertise in these products.
                </span>
                <br />
                <br />
                <h4>7.3. Technical risk</h4>
                <span>
                  - Problems or errors in the operation of software and computer equipment of the Company, unstable
                  Internet connection, interruption of transmission of information flows, interruption of power supply,
                  problems in transmission, being attacked by hackers, as well as any illegal activity related to the
                  device. We reserve the right to refuse and not accept the results of the technical troubleshooting
                  sessions mentioned above and will restore the customer's account before the time of the incident.
                </span>
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        </header>
        <footer>
          <div className="container d-flex justify-content-between">
            <div className="footer-left">
              <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="" />
              <p>
                Finimix is developed by professionals with year of experience in the information technology, finace and
                crypto fields to create a smart, secure, relible and susrainable investment platform.
              </p>
            </div>
            <div className="footer-right d-flex justify-content-between">
              <a href={ROUTE_PATH.TERM_OF_USE} className="active">
                Term of use
              </a>
              <a href={ROUTE_PATH.PRIVATE_POLICY}>Private Policy</a>
            </div>
          </div>
        </footer>
      </Scrollbars>
    </LoadingProvider>
  );
};

export default React.memo(TermOfUseComponent);
