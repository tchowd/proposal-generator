'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

// type FilterButtonsProps = {
//   onClose: () => void;
// };

function ProposalPage() {
  const [team, setTeam] = useState('');
  const [abstract, setAbstract] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVillageAI, setShowVillageAI] = useState(false);
  const [benefits, setBenefits] = useState('');
  const [motivation, setMotivation] = useState('');
  const [rationale, setRationale] = useState('');
  const [keyTerms, setKeyTerms] = useState('');
  const [specs, setSpecs] = useState('');
  const [steps, setSteps] = useState('');
  const [time, setTime] = useState('');
  const [cost, setCost] = useState('');
  const [generatedText, setGeneratedText] = useState('');  // <--- Add this state for the generated text
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const bioRef = useRef<null | HTMLDivElement>(null);


  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      body: {
        abstract, author, team, motivation, rationale, keyTerms, specs, steps, time, cost
      },
    });

  const handleAbstractInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleInputChange(e);
      setAbstract(e.target.value);
  };
  
  
  const handleAuthorInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleInputChange(e);
      setAuthor(e.target.value);
  };

  const handleTeamInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    setTeam(e.target.value);
};

const handleMotivationInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    setMotivation(e.target.value);
};

const handleRationaleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  handleInputChange(e);
  setRationale(e.target.value);
};

const handleKeyTermsInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  handleInputChange(e);
  setKeyTerms(e.target.value);
};

const handleSpecsInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  handleInputChange(e);
  setSpecs(e.target.value);
};

const handleStepsInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  handleInputChange(e);
  setSteps(e.target.value);
};

const handleTimeInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  handleInputChange(e);
  setTime(e.target.value);
};

const handleCostInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  handleInputChange(e);
  setCost(e.target.value);
};


  const lastMessage = messages[messages.length - 1];
  const generatedBios = lastMessage?.role === "assistant" ? lastMessage.content : null;
  const formattedBios = formatGeneratedBios(generatedBios || '');
  const processedData = extractIncluding2(generatedBios || '');
  
  // const onSubmit = (e: any) => {
  //   e.preventDefault();
  //   setAbstract(input);
  //   setAuthor(input);
  //   setTeam(input);
  //   setMotivation(input);
  //   setRationale(input);
  //   setKeyTerms(input);
  //   setSpecs(input);
  //   setSteps(input);
  //   setTime(input);
  //   setCost(input);
  //   handleSubmit(e);
  // };

  const onSubmit = (e: any) => {
    handleSubmit(e);
};


  useEffect(() => {
    setTitle(formattedBios);
  }, [formattedBios]);

  useEffect(() => {
      setDescription(processedData);
  }, [processedData]);

  type Milestone = {
    number: number;
    date: string;
    description?: string; // Add this line
  };
  
  const [milestones, setMilestones] = useState<Milestone[]>([{ number: 1, date: '', description: '' }]);
  
  const addMilestone = () => {
      const newNumber = milestones.length + 1;
      setMilestones(prevMilestones => [...prevMilestones, { number: newNumber, date: '', description: '' }]);
    };

    const mainPlaceholder = `
    PROPOSAL NAME: 

    PROPOSAL CATEGORY:
    There are four different categories to choose from:
        - Ecosystem Fund Allocation
        - Informational
        - Brand Decision 
        - Process

    TEAM DESCRIPTION:
    Provide a brief introduction of yourself and your team if you’re requesting funding. If you’re seeking funding, each team member set to receive funds must separately sign a grant agreement and undergo KYC verification before funds are released.
    
    ABSTRACT:
    A brief summary outlining your proposal. This section will be showcased on Snapshot for the community’s consideration and should effectively communicate key details about your proposal.
    
    BENEFIT TO APECOIN ECOSYSTEM:
    Explain how your proposal will benefit the ApeCoin ecosystem, and how it aligns with the APE Community’s core mission and values 2. This section will be visible to voters on Snapshot.
    
    KEY TERMS:
    Definitions of any terms within the proposal that are unique to the proposal, new to the APE Community, and/or industry-specific (optional).
    
    PLATFORMS & TECHNOLOGIES:
    A detailed breakdown of the platforms and technologies that will be used, if any.
    
    STEPS TO IMPLEMENT & TIMELINE:
    Outline the steps to implement your proposal, including the associated costs, key performance indicators, personnel requirements, any expectations of the Ape Foundation, and other resources needed for each step where applicable. This section also provides relevant timing details, including the project’s start date and key milestones.
    
    OVERALL COST:
    Summarize the total budget associated with implementing the proposal.`;

  return (
    <>
      <div className='ml-[16px] mr-[16px] relative'>
        <div className="flex mt-[16px]  gap-8 justify-between items-center">
          <div className="flex ">
            <div className='mb-2'>
              <div className='flex mb-2'>
                <h2 className='text-neutral-200'>Use Village AI ✨</h2>
                <label className="relative inline-flex items-center cursor-pointer ml-3">
                  <input type="checkbox" value="" className="sr-only peer" onClick={() => setShowVillageAI(!showVillageAI)}/>
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 "></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        

        {!showVillageAI && (
          <textarea
            style={{ height: '80vh' }}
            rows={24}
            className='w-full ml-2 text-white rounded-lg bg-transparent p-[2px] text-white rounded-lg border border-custom-gray'
            placeholder={mainPlaceholder}
          ></textarea>
        )}
      </div>

      <div className='mr-[16px] ml-[16px]'>  
          {showVillageAI && (
            <form onSubmit={onSubmit}>
            <div className='w-full flex overflow-y-scroll' > 
            <div className='w-1/2 pr-4 text-white overflow-scroll rounded-lg focus:z-10 focus:ring-4 focus:ring-gray-200 relative' 
                  style={{ height: '80vh' }} >
                <button type="button"
                    className="w-56 mr-2 text-sm font-normal h-10 text-white rounded-lg border  hover:text-white"
                >
                    No Proposal Category Selected
                </button>
                  <div className='flex flex-col mt-4'> 
                  <div className='flex'>
                   Abstract 
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                  <textarea
                      required
                      value={abstract}
                      onChange={handleAbstractInputChange}
                      placeholder='i.e. Proposal for Ape Energy, An energy drink with Ape branding'
                      rows={1}
                      className="w-full mt-2 bg-transparent p-2 text-white rounded-lg border border-custom-gray "
                  />
                  </div> 
                  <div className='flex flex-col mt-4'> 
                  <div className='flex'>
                    Author 
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                  <textarea
                      onChange={handleAuthorInputChange}
                      value={author}
                      placeholder='i.e. Enter team description'
                      rows={1}
                      className="w-full mt-2 bg-transparent p-2 text-white rounded-lg border border-custom-gray "
                  />
                  </div>
                  <div className='flex flex-col mt-4'> 
                  <div className='flex'>
                  Team Description 
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                  <textarea
                      onChange={handleTeamInputChange}
                      value={team}
                      placeholder='i.e. Enter team description'
                      rows={1}
                      className="w-full mt-2 bg-transparent p-2 text-white rounded-lg border border-custom-gray "
                  />
                  </div>  
                  <div className='flex flex-col mt-4'>  
                  <div className='flex'>
                  Motivation 
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                  <textarea
                      onChange={handleMotivationInputChange}
                      value={motivation}
                      placeholder='i.e. A new way to bring more attention to the Ape brand'
                      rows={1}
                      className="w-full mt-2 bg-transparent p-2 text-white rounded-lg border border-custom-gray "
                  />
                  </div>
                  <div className='flex flex-col  mt-4'> 
                  <div className='flex'>
                  Rationale 
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                  <textarea
                      onChange={handleRationaleInputChange}
                      value={rationale}
                      placeholder='i.e. Aligns with the DAO’s goals of making Ape a global brand'
                      rows={1}
                      className="w-full mt-2 bg-transparent p-2 text-white rounded-lg border border-custom-gray "
                  />
                  </div>

                  <div className='flex flex-col  mt-4'> 
                  <div className='flex'>
                  Key Terms (optional) 
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                  <textarea
                      onChange={handleKeyTermsInputChange}
                      value={keyTerms}
                      placeholder='i.e. 3PL = 3rd party logistics'
                      rows={1}
                      className="w-full mt-2 bg-transparent p-2 text-white rounded-lg border border-custom-gray "
                  />
                  </div>

                  <div className='flex flex-col  mt-4'> 
                  <div className='flex'>
                  Specifications 
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                  <textarea
                      onChange={handleSpecsInputChange}
                      value={specs}
                      placeholder='i.e. Pietra (https://www.pietrastudio.com/new-brands)'
                      rows={1}
                      className="w-full mt-2 bg-transparent p-2 text-white rounded-lg border border-custom-gray "
                  />
                  </div>

                  <div className='flex flex-col  mt-4'> 
                  <div className='flex'>
                  Steps to Implement 
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                  <textarea
                      onChange={handleStepsInputChange}
                      value={steps}
                      placeholder='i.e. Only one person needed 1. design products 2. source manufacturers, $15,000 3. set up digital shop'
                      rows={2}
                      className="w-full mt-2 bg-transparent p-2 text-white rounded-lg border border-custom-gray "
                  />
                  </div>

                  <div className='flex flex-col  mt-4'> 
                  <div className='flex'>
                  Timeline 
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                  <textarea
                      onChange={handleTimeInputChange}
                      value={time}
                      placeholder='i.e. products can be ready to order in 2 months. milestones: design products, source manufacturers, set up shop, complete first sale'
                      rows={2}
                      className="w-full mt-2 bg-transparent p-2 text-white rounded-lg border border-custom-gray "
                  />
                  </div>

                  <div className='flex flex-col mt-4'>
            <div className='flex'>
              Key Milestones
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                {milestones.map((milestone, index) => (
                    <div key={index} className='ml-10 mt-2'>
                        <div className='flex'>
                        <div className='mr-3 mt-4 flex'>
                            <h2 className='mr-[5px]'>Milestone</h2>
                            <h2 className='mr-1'>{milestone.number}</h2>
                        </div>
                            <textarea
                                placeholder={'i.e. Design Products'}
                                rows={1}
                                className="w-full mt-2 bg-transparent p-2 text-white rounded-lg border border-custom-gray "
                                value={milestone.description}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    const newMilestones = [...milestones];
                                    newMilestones[index].description = newValue;
                                    setMilestones(newMilestones);
                                }}
                            />
                        </div>
                        <div className='flex'>
                            <h2 className='mr-12 mt-2'>Date</h2>
                            <textarea
                                placeholder={'i.e. 10/10/2021'}
                                rows={1}
                                className="w-full mt-2 bg-transparent p-2 text-white rounded-lg border border-custom-gray "
                                value={milestone.date}
                                onChange={(e) => {
                                    const newDate = e.target.value;
                                    const newMilestones = [...milestones];
                                    newMilestones[index].date = newDate;
                                    setMilestones(newMilestones);
                                }}
                            />
                        </div>
                    </div>
                ))}
                <button onClick={addMilestone} className='mt-4'>&#x2b; Add Milestone</button>
            </div>

                   <div className='flex flex-col  mt-4'> 
                  <div className='flex'>
                  Overall Cost
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                  <textarea
                      placeholder={'ie. $15,000'}
                      onChange={handleCostInputChange}
                      value={cost}
                      rows={1}
                      className="w-full mt-2 bg-transparent p-2 text-white rounded-lg border border-custom-gray "
                  />
                  </div>              
              </div>
              <textarea
                  style={{ height: '80vh' , whiteSpace: "pre-wrap"}}
                  onChange={(e) => setDescription(e.target.value)}  // Update only the description state
                  value={description} 
                  rows={24}
                  className="w-1/2 mb-2 bg-transparent p-2 overflow-scroll text-white rounded-lg border border-custom-gray"
                  placeholder={mainPlaceholder}
              />
            </div>
              <button
                type="submit"
                className="text-sm mt-1 ml-[58vh] font-normal h-10 text-white w-20 rounded-3xl border border-blue-800 hover:bg-blue-700 hover:text-white focus:z-10 focus:ring-4"
              >
                Generate
            </button>
            </form>
          )}
          
          <button
            type="button"
            className="absolute bottom-0 right-0 mb-4 mr-4 text-white bg-blue-700 hover:bg-blue-800 h-10 font-normal rounded-3xl text-sm  w-20"> 
              Create
          </button>
      </div>
    </>
  )
}

export default ProposalPage


function formatGeneratedBios(bios: string) {
  const startPoint = bios.indexOf("2.");
  if (startPoint !== -1) {
      bios = bios.substring(0, startPoint).trim();
  }

  const lines = bios.split('\n');
  let formattedText = '';

  lines.forEach(line => {
    const parts = line.split(':');
    if (parts[0].includes('Proposal Name') && parts[1]) {
      formattedText += parts[1].trim() + '\n';
    } else {
      formattedText += line + '\n';
    }
  });

  return formattedText.trim(); // Remove trailing newline
}

function extractIncluding2(bios: string) {
  const startPoint = bios.indexOf("2.");
  if (startPoint === -1) {
      return bios; // return the original string if "2." is not found
  }
  return bios.substring(startPoint + 2).trim(); // +2 to exclude "2."
}
