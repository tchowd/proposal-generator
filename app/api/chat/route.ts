import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  const { abstract, title, category, team, benefits, keyTerms, specs, steps, time, cost  } = await req.json();

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    stream: true,
    messages: [
      {
        role: 'user',
        content: `
        Generate a complete 45 word proposal. 

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
      },
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
