import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
  const { abstract, title, category, team, benefits, keyTerms, specs, steps, time, cost  } = await req.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: `
        Generate a complete 250 word proposal. 

        ##### Do not provide information that was not provided. 
        ##### The structure should look like this:

        Title:
        - Use ${title} as the title.
        - The title of the proposal.

        PROPOSAL CATEGORY:
          - Use ${category} as the category.
          -  ONLY ONE: Brand Decision 15 for proposals that the DAO attaches its name to, including projects and collaborations OR 
             Ecosystem Fund Allocation 27 for proposals that rely on funds from the Ape Foundation in order to be executed OR
             Informational for proposals that suggest changes to the guidelines or that provide information to the ApeCoin community OR 
            Process for proposals about making changes to any of the decision-making processes. This covers everything from submitting an AIP to the voting process, to the tools and platforms used. 

        ABSTRACT: 
          - Use ${abstract} as the abstract.
          - Two or three sentences that summarize the proposal. 

        
        TEAM DESCRIPTION:	
            - Use ${team} as the team description.
            - A brief background of your team involved, if any. If direct funding is intended for multiple members of your team, each of those members must individually sign a grant agreement and undergo a KYC verification procedure before the funds can be released to them. Enter background. 

        BENEFITS TO APECOIN ECOSYSTEM:
          - Use ${benefits} as the benefits description.
          - Explain how your proposal will benefit the ApeCoin ecosystem. If your AIP is requesting funding, explain in detail the benefit in relation to the amount of funding that you are requesting. Enter benefit. 

        KEY TERMS (OPTIONAL):
          - Use ${keyTerms} as the key terms description.
          -Definitions of any terms within the proposal that are unique to the proposal, new to the APE Community, and/or industry-specific. Enter key terms. 

        SPECIFICATIONS:
          - Use ${specs} as the specficaitions description.
          -A detailed breakdown of the platforms and technologies that will be used. Enter specifications. Steps to Implement | The steps to implement the proposal, including associated costs, manpower, and other resources for each step where applicable. Enter steps to implement. 

        TIMELINE:	
          - Use ${time} as the specficaitions description.
          - Relevant timing details, including but not limited to start date, milestones, and completion dates. Enter timeline. Overall Cost | The total cost to implement the proposal. Enter overall cost.
                      
         COST:
          - Use ${cost} as the cost description.
          - The total cost to implement the proposal. Enter overall cost.
          `
        //https://forum.apecoin.com/t/aip-344-moving-gallery-for-the-dao/19092

        // Input date

        // content:`Create a 250 word proposal about ${abstract}`
        // content: `Generate a complete 250 word proposal that must use the following information: ${abstract}, 
        // ${team}, ${abstract}, ${motivation}, ${rationale}, ${keyTerms}, ${specs}, ${steps}, ${time},${milestones}, ${cost}."
        //       Use the following template and make sure to not create false information:
        //       Proposal Name. 
        //       Proposal Category.
        //       There are four different categories to choose from: 
        //         1. Choose Brand Decision 15 for proposals that the DAO attaches its name to, including projects and collaborations. 
        //         2. Choose Ecosystem Fund Allocation 27 for proposals that rely on funds from the Ape Foundation in order to be executed. 
        //         3. Choose Informational 1 for proposals that suggest changes to the guidelines or that provide information to the ApeCoin community. 
        //         4. Choose Process 1 for proposals about making changes to any of the decision-making processes. This covers everything from submitting an AIP to the voting process, to the tools and platforms used. 
        //       Abstract | Two or three sentences that summarize the proposal. 
        //       Author Description (mandatory if the AIP is requesting funds) | A brief background of yourself. If you are requesting funding, you must sign a grant agreement and undergo a KYC verification process before the funds can be disbursed. Enter background. 
        //       Team Description (mandatory if the AIP is requesting funds) | A brief background of your team involved, if any. If direct funding is intended for multiple members of your team, each of those members must individually sign a grant agreement and undergo a KYC verification procedure before the funds can be released to them. Enter background. 
        //       Motivation | A statement on why the APE Community should implement the proposal. Enter motivation. Rationale | An explanation of how the proposal aligns with the APE Community’s mission and guiding values. Enter rationale. 
        //       Benefit to ApeCoin Ecosystem | Explain how your proposal will benefit the ApeCoin ecosystem. If your AIP is requesting funding, explain in detail the benefit in relation to the amount of funding that you are requesting. Enter benefit. 
        //       Key Terms (optional) | Definitions of any terms within the proposal that are unique to the proposal, new to the APE Community, and/or industry-specific. Enter key terms. 
        //       Specifications | A detailed breakdown of the platforms and technologies that will be used. Enter specifications. Steps to Implement | The steps to implement the proposal, including associated costs, manpower, and other resources for each step where applicable. Enter steps to implement. 
        //       Timeline | Relevant timing details, including but not limited to start date, milestones, and completion dates. Enter timeline. Overall Cost | The total cost to implement the proposal. Enter overall cost.
        //       `,


        // V2
        // Generate a complete 250 word proposal. 

        // ##### Do not provide information that was not provided and use EXAMPLE FOR REFERENCE as a guide. 
        // ##### The structure should look like this:

        // PROPOSAL CATEGORY:
        //   -  Brand Decision 15 for proposals that the DAO attaches its name to, including projects and collaborations OR 
        //      Ecosystem Fund Allocation 27 for proposals that rely on funds from the Ape Foundation in order to be executed OR
        //      Informational for proposals that suggest changes to the guidelines or that provide information to the ApeCoin community OR 
        //     Process for proposals about making changes to any of the decision-making processes. This covers everything from submitting an AIP to the voting process, to the tools and platforms used. 

        //   ABSTRACT: 
        //   - Use ${abstract} as the abstract.
        //   - Two or three sentences that summarize the proposal. 

        // AUTHOR DESCRIPTION:	
        //     - Use ${author} as the author description.
        //     - A brief background of yourself. If you are requesting funding, you must sign a grant agreement and undergo a KYC verification process before the funds can be disbursed. Enter background. 

        // TEAM DESCRIPTION:	
        //     - Use ${team} as the team description.
        //     - A brief background of your team involved, if any. If direct funding is intended for multiple members of your team, each of those members must individually sign a grant agreement and undergo a KYC verification procedure before the funds can be released to them. Enter background. 

        // MOTIVATION:
        //   - Use ${motivation} as the motivation description.
        //   - A statement on why the APE Community should implement the proposal. Enter motivation. Rationale | An explanation of how the proposal aligns with the APE Community’s mission and guiding values. Enter rationale. 

        // BENEFITS TO APECOIN ECOSYSTEM:
        //   - Use ${rationale} as the benefits description.
        //   - Explain how your proposal will benefit the ApeCoin ecosystem. If your AIP is requesting funding, explain in detail the benefit in relation to the amount of funding that you are requesting. Enter benefit. 

        // KEY TERMS (OPTIONAL):
        //   - Use ${keyTerms} as the key terms description.
        //   -Definitions of any terms within the proposal that are unique to the proposal, new to the APE Community, and/or industry-specific. Enter key terms. 

        // SPECIFICATIONS:
        //   - Use ${specs} as the specficaitions description.
        //   -A detailed breakdown of the platforms and technologies that will be used. Enter specifications. Steps to Implement | The steps to implement the proposal, including associated costs, manpower, and other resources for each step where applicable. Enter steps to implement. 

        // TIMELINE:	
        //   - Use ${time} as the specficaitions description.
        //   - Relevant timing details, including but not limited to start date, milestones, and completion dates. Enter timeline. Overall Cost | The total cost to implement the proposal. Enter overall cost.
                      
        //  COST:
        //   - Use ${cost} as the cost description.
        //   - The total cost to implement the proposal. Enter overall cost.
      },
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
