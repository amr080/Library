# Blockchain

---

<img src="https://x-financial-technologies.replit.app/assets/xft-dollar-system-config.png" alt="XFT Dollar System Configuration" width="600">

## Consensus Mechanisms
- Proof of work
- Proof of stake
- Proof of compliance
- Proof of authority
- Proof of reserves
- Proof of title
- Proof of identity
- Proof of burn
- Proof of transfer
- Proof of history
- Proof of capacity
- Proof of checkpoint
- Proof of creativity

## Networks
- Quorum
- X Ledger
- Hyperledger Fabric
- Stellar
- Daml
- Canton
- Polkadot
- Substrate
- Centrifuge
- Ethereum
- Base
- Arbitrum
- Optimism
- Starknet
- Polygon
- Cosmos
- Provenance
- Layer Zero
- Axelar
- Avalanche
- BNB Chain
- Solana


## Engineering

- [Trading System Design](https://turingfinance.com/wp-content/uploads/2013/11/U10026942_SoftwareArchitectureDocument_ATs.pdf)
- [Hardware Accelerated HFT System](https://courses.grainger.illinois.edu/ece445/getfile.asp?id=20871)
- [RegTech System Design](https://typeset.io/pdf/generic-solution-architecture-design-of-regulatory-2k014axa.pdf)
- [API Repository](https://xft-api-docs.replit.app/)
- [XS Protocol](https://github.com/X-Financial-Technologies/Library/blob/main/Securitize/Securitize%E2%80%99s%2BDigital%2BOwnership%2BArchitecture%2Bfor%2BComplete%2BLifecycle%2BManagement%2Bof%2BDigital%2BSecurities.pdf)

# Flows

---

### Issuance

<table style="border-collapse:collapse;border-spacing:0;table-layout: fixed; width: 463px" class="tg"><colgroup><col style="width: 462.66667px"></colgroup>
<thead>
<tr>
<td style="border-color:inherit;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;text-align:left;vertical-align:top;word-break:normal">1. The Issuer needs to start the issuance process in order to get investors into its STO. This process will usually take place via a DS Issuing Platform or a DS App, and in the example we are considering the Securitize Platform in this context. This process is outside the scope of the DS Protocol.<br><br>2. As part of the on-boarding the issuer will identify investors, gathering KYC (Know Your Customer), AML (Anti-Money Laundering) and accreditation status for them. Investors may also have to sign a subscription agreement. Again, this happens through the DS Issuing Platform and is not part of DS Protocol.<br><br>3. The issuer must then register the information from the investors in the Registry Service. The DS Issuing Platform may manage this for the Issuer, or the Issuer can do this directly in the Ethereum blockchain via the DS Protocol method registerInvestor(). This method will provide the information required for the Digital Security lifecycle, as described in the Registry Service section above.<br><br>4. Once the issuance process, including collecting funds and applying issuance discounts (which is out of scope for the DS Protocol) is complete, the issuer (usually through the DS Issuing Platform) will create the DS Token contract and assign the issued tokens to the registered investors. The DS Token contract includes a reference to the Registry Service contract for that purpose.</td>
</tr>
</thead></table>

### Dividend Distribution

<table style="border-collapse:collapse;border-spacing:0;table-layout: fixed; width: 463px" class="tg"><colgroup><col style="width: 462.66667px"></colgroup>
<thead>
<tr>
<td style="border-color:inherit;border-style:solid;border-width:1px;font-family:Arial, Helvetica, sans-serif !important;font-size:14px;overflow:hidden;padding:10px 5px;text-align:left;vertical-align:top;word-break:normal">1. An Issuer uses the console of their DS Issuing Platform to start a dividend issuance. Alternatively, depending on the specific DS App implementation, this could be triggered by an app-specific UI or directly in the blockchain without the need for a specific front-end.<br><br>2. This triggers the issueDividends() method, sending the amount of dividends to distribute to the Dividends App contract as Ether. The Dividends App is a contract following the DS App interface and DS Protocol, and has been associated with the DS Token at some point by the Issuer (potentially as part of the dividend issuance process itself). The specific logic of the contract, including the issueDividends() method or the decision to use Ether for the dividend distribution, is not part of the DS Protocol, as apps are flexible to provide any kind of function required by issuers. This is just a possible implementation for the purpose of explaining the mechanism.<br><br>3. The Dividends App then accesses the DS Token via the DS Protocol to be able to iterate through the list of investors currently active. This mechanism is specific to the DS Protocol, as ERC-20 standard does not provide a way to do this.<br><br>4. The Dividend App then sends the corresponding part of the dividends to each investor’s wallet. The Dividend App may check in the Registry Service (not depicted for simplicity) the country associated with the investor, so that it can withhold the appropriate taxes when applicable. If for some reason the operation to send the Ether to a specific investor fails, their assigned dividend is kept in the Dividends App contract and an allowance is set for that investor.<br><br>5. The Dividends App uses the Comms Service to communicate to each investor the information regarding their dividend issuance, including in the cases in which the send operation has failed, so that they can retrieve the funds later.<br><br>6. The Comms Service sends that communication to the corresponding investors.<br><br>7. Those investors that were not able to receive their funds in the direct method can use the withdraw() method in the contract to retrieve their funds at a later date.</td>
</tr>
</thead></table>


### Voting Process

<table style="border-collapse:collapse;border-spacing:0;table-layout: fixed; width: 463px" class="tg"><colgroup><col style="width: 462.66667px"></colgroup>
<thead>
<tr>
<td style="border-color:inherit;border-style:solid;border-width:1px;font-family:Arial, Helvetica, sans-serif !important;font-size:14px;overflow:hidden;padding:10px 5px;text-align:left;vertical-align:top;word-break:normal">1. An Issuer uses the console of their DS Issuing Platform to start the voting event. Alternatively, depending on the specific DS App implementation, this could be triggered by an app-specific UI or directly in the blockchain without the need for a specific front-end.<br><br>2. This triggers the proposeVote() method to the Voting DS App contract. This app, as in the previous example, is a contract following the DS App interface and DS Protocol and has been associated with the DS Token by the Issuer. The definition and function of the proposeVote() method (including its name) is something decided by the smart contract developer and is not part of the DS Protocol. In this example, we assume the method (or methods) involved in its configuration sets a start and end date for the voting, plus the range of valid values to vote for.<br><br>3. The Voting DS App then accesses the DS Token via the DS Protocol to be able to iterate through the list. This is the same mechanism as presented in the previous example.<br><br>4. The Voting DS App uses the Comms Service to communicate to each investor the information regarding the voting event.<br><br>5. The Comms Service sends that communication to the corresponding investors.<br><br>6. At some point, investors start issuing their votes via the vote() method into the Voting DS App contract. They can do this directly through the blockchain, or the DS Issuing Platform may provide some sort of front-end to facilitate the interaction by investors. The Voting DS App contract only accepts votes from valid investors that cast their votes after the defined start date and before the end date of the contract.<br><br>7. Once the voting period is finished, the Issuer calls for the vote to close. Alternatively, the DS Issuing Platform could trigger this event automatically once the end date for the voting has been reached.<br><br>8. This triggers the execution of the closeVote() method in the Voting DS App contract. Depending on the design of the DS App, this could be a low-permission method (so that the platform could trigger it with a basic key) but would only close the voting if the end date has actually expired, or require some administration permission (e.g., only available to specific Issuer’s keys) and be authoritative, closing the voting regardless of the date. These options show the flexibility that different implementations of DS Apps can bring to the Digital Securities ecosystem.<br><br>9. The Voting DS App contract goes over the list of votes collected from each investor and weighs them proportionally to the DS Tokens they hold at this specific point in time. To get the individual token balances, the Voting DS App checks the DS Token (while the diagram shows the access via the DS Protocol, for this specific operation the basic ERC-20 capabilities are sufficient, which illustrates that the DS Protocol for DS Tokens is an extension of ERC-20).<br><br>10. Once all votes are considered, the Voting DS App uses the Comms Service to communicate to each investor the result of the voting event.<br><br>11. The Comms Service sends that communication to the corresponding investors.</td>
</tr>
</thead></table>



### Buying Tokens

<table style="border-collapse:collapse;border-spacing:0;table-layout: fixed; width: 463px" class="tg"><colgroup><col style="width: 462.66667px"></colgroup>
<thead>
<tr>
<td style="border-color:inherit;border-style:solid;border-width:1px;font-family:Arial, Helvetica, sans-serif !important;font-size:14px;overflow:hidden;padding:10px 5px;text-align:left;vertical-align:top;word-break:normal">1. The Exchange runs its own KYC process on the Investor and verifies their identity.<br><br>2. The Exchange creates an Ethereum wallet for the investor.<br><br>3. The Exchange registers the wallet to the investor via the Registry Service.<br><br>4. This operation may fail if the Investor is unknown, particularly in the case of a new investor.<br><br>5. The Exchange matches the buy order with one (or several) sell order(s). In this case, <br><br>6. The Exchange transfers the tokens between wallets, using the transfer() method. This triggers the execution of the regulatory checks by the Compliance Service.<br><br>7. If no regulatory limits are surpassed, the trade takes place.<br><br>8. The new investor has the DS Tokens in their Exchange wallet and can perform additional trades or withdraw them to another wallet by registering that wallet through the exchange or issuer.<br></td>
</tr>
</thead></table>


### Selling Tokens

<table style="border-collapse:collapse;border-spacing:0;table-layout: fixed; width: 463px" class="tg"><colgroup><col style="width: 462.66667px"></colgroup>
<thead>
<tr>
<td style="border-color:inherit;border-style:solid;border-width:1px;font-family:Arial, Helvetica, sans-serif !important;font-size:14px;overflow:hidden;padding:10px 5px;text-align:left;vertical-align:top;word-break:normal">1. The Exchange has run its own KYC process on the Investor and has their identity.<br><br>2. The Exchange creates an Ethereum wallet for the investor.<br><br>3. The Exchange registers the wallet to the investor via the Registry Service. This operation should be successful because the investor is preexisting, as they claim to already own the token. If this fails, the Exchange should inform the investor that there is a problem with their information.<br><br>4. The Exchange matches the buy order with one (or several) sell order(s). This should work as both wallets are registered to the investor and investors can move their tokens freely across their own wallets.<br><br>5. The exchange matches the sell order with a buy order.<br><br>6. The Exchange transfers the tokens between wallets, using the transfer() method. This will trigger the execution of the regulatory checks by the Compliance Service.<br><br>7. If no regulatory limits are surpassed the trade takes place.<br><br>8. The investor no longer has the tokens in their Exchange wallet and has received the currency/tokens they asked for in exchange.</td>
</tr>
</thead></table>


### Accreditation

<img src="https://docs.yieldteq.io/assets/images/usty-kyc-accreditation-4429b97e0c191ab31168b017b17f662c.png" alt="USTX KYC Accreditation" width="600">


### Subscription

<img src="https://docs.yieldteq.io/assets/images/usty-subscription-process-2-25256fc436fea843bcf5a83454df6ffb.png" alt="USTX Subscription Process" width="600">

### Redemption

<img src="https://docs.yieldteq.io/assets/images/usty-redemption-process-2-5de97da02920da50b67f346d350ab85e.png" alt="USTX Redemption Process" width="600">
