'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

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
  const [category, setCategory] = useState('');

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
  
  
  const handleTitleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleInputChange(e);
      setTitle(e.target.value);
  };

  const handleTeamInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    setTeam(e.target.value);
};

const handleMotivationInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    setMotivation(e.target.value);
};

const handleCategoryInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  handleInputChange(e);
  setCategory(e.target.value);
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

  const removeMilestone = () => {
      const newMilestones = [...milestones];
      newMilestones.pop();
      setMilestones(newMilestones);
  };


  return (
    <>

      <div className='mr-[16px] ml-[16px] mt-10'>  
            <form onSubmit={onSubmit}>
            <div className='w-full flex overflow-y-scroll' > 
            <div className='w-1/2 pr-4 text-white overflow-scroll rounded-lg focus:z-10 focus:ring-4 focus:ring-gray-200 relative' 
                  style={{ height: '80vh' }} >
                  <div className='flex flex-col '> 
                  <div className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>
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
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px"
                  />
                  <div className="text-neutral-200 text-xs opacity-50 w-full mt-3 max-md:max-w-full">
                    Tip: you can give a short description to get a proposal. But the more details you add, the better the proposal will be.
                  </div>
                  </div>
                  <div className="items-start flex w-full h-px flex-col mt-3 border-b-blue-600 border-b border-solid max-md:max-w-full" />

                  <div className='flex flex-col mt-4'> 
                  <div className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>
                    Title 
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                  <textarea
                      onChange={handleTitleInputChange}
                      value={title}
                      placeholder='i.e. Enter team description'
                      rows={1}
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px"
                  />
                  </div>
                    <div className='flex flex-col mt-4'> 
                    <div className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>
                    Proposal Category 
                    <div className="hover:text-blue-700 hover:cursor-pointer">
                        <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                      </div>
                    </div>
                    <textarea
                        onChange={handleCategoryInputChange}
                        value={category}
                        placeholder='i.e. Enter team description'
                        rows={1}
                        className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                        items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                        text-neutral-400 text-xs opacity-50 max-w-full -mt-px"
                    />
                  </div>
                  <div className='flex flex-col mt-4'> 
                  <div className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>
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
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px"
                      />
                  </div>  
                  <div className='flex flex-col mt-4'>  
                  <div className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>
                  BENEFIT TO APECOIN ECOSYSTEM 
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                  <textarea
                      onChange={handleMotivationInputChange}
                      value={motivation}
                      placeholder='i.e. A new way to bring more attention to the Ape brand'
                      rows={1}
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px"
                  />
                  </div>

                  <div className='flex flex-col  mt-4'> 
                  <div className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>
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
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px"
                  />
                  </div>

                  <div className='flex flex-col  mt-4'> 
                  <div className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>
                  PLATFORMS & TECHNOLOGIES 
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                  <textarea
                      onChange={handleSpecsInputChange}
                      value={specs}
                      placeholder='i.e. Pietra (https://www.pietrastudio.com/new-brands)'
                      rows={1}
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px"
                  />
                  </div>

                  <div className='flex flex-col  mt-4'> 
                  <div className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>
                  STEPS TO IMPLEMENT & TIMELINE
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                  <textarea
                      onChange={handleStepsInputChange}
                      value={steps}
                      placeholder='i.e. Only one person needed 1. design products 2. source manufacturers, $15,000 3. set up digital shop'
                      rows={2}
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px"
                  />
                  </div>

                  <div className='flex flex-col mt-4'>
            <div className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>
              Key Milestones
                   <div className="hover:text-blue-700 hover:cursor-pointer">
                      <AiOutlineQuestionCircle style={{marginTop: '5px', marginLeft: '0.5rem'}} />
                    </div>
                  </div>
                {milestones.map((milestone, index) => (
                    <div key={index} className='ml-10 mt-2'>
                      <div className="items-start flex w-full gap-2.5 mt-3 max-md:max-w-full max-md:flex-wrap">
                        <button
                        onClick={removeMilestone} disabled={milestones.length <= 1}
                        className="justify-center items-center rounded self-center flex w-4 max-w-full flex-col my-auto border-[0.5px] border-solid border-blue-600">
                          <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&"className="aspect-square object-cover object-center w-full overflow-hidden self-stretch grow" />
                        </button>
                        <div className="items-end self-stretch flex flex-col grow shrink-0 basis-auto pl-5 max-md:max-w-full">
                          <div className="justify-end items-start flex w-[529px] max-w-full gap-2.5 max-md:flex-wrap">
                            <div className="text-neutral-200 text-xs leading-[183.33%] self-center my-auto">Milestone 1</div>
                            <textarea
                                placeholder={'i.e. Design Products'}
                                rows={1}
                                className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                                items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                                text-neutral-400 text-xs opacity-50 max-w-full -mt-px"
                                value={milestone.description}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    const newMilestones = [...milestones];
                                    newMilestones[index].description = newValue;
                                    setMilestones(newMilestones);
                                }}
                            />
                          </div>
                          <div className="justify-end items-start flex w-[545px] max-w-full gap-2.5 mt-2 max-md:flex-wrap">
                            <div className="text-neutral-200 text-xs leading-[183.33%] self-center my-auto">Required Time</div>
                            <textarea
                                placeholder={'i.e. 10/10/2021'}
                                rows={1}
                                className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                                items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                                text-neutral-400 text-xs opacity-50 max-w-full -mt-px"
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
                      </div>
                    </div>
                    
                ))}
            </div>
            <button onClick={addMilestone} className='mt-4 flex text-neutral-200 text-xs leading-[183.33%] self-stretch'>
              <label
                htmlFor="milestone-input"
                className="justify-center mr-2 items-center rounded border self-center flex w-4 max-w-full flex-col my-auto border-solid border-blue-600"
              >
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&"className="aspect-square object-cover object-center w-full overflow-hidden self-stretch grow"
                  alt="Milestone Image"
                />
              </label>
              <h2 className='hover:text-blue'>Add Milestone</h2>
            </button>


                   <div className='flex flex-col  mt-4'> 
                  <div className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>
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
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px"
                  />
                  </div>              
              </div>
              {/* <textarea
                  style={{ height: '80vh' , whiteSpace: "pre-wrap"}}
                  onChange={(e) => setDescription(e.target.value)}  // Update only the description state
                  value={description} 
                  rows={24}
                  className="w-1/2 mb-2 bg-transparent p-2 overflow-scroll text-white rounded-lg border border-custom-gray
                  text-neutral-400 text-xs self-stretch items-start rounded border 
                  border-solid border-zinc-800 "
                  placeholder={mainPlaceholder}
              /> */}
              <textarea 
              style={{ height: '80vh' , whiteSpace: "pre-wrap"}}
              onChange={(e) => setDescription(e.target.value)} 
              className="w-1/2 mb-2 bg-transparent p-2 overflow-scroll text-white rounded-lg border border-custom-gray
              text-neutral-400 text-xs self-stretch items-start rounded border 
              border-solid border-zinc-800 "
    // className="text-neutral-400 text-xs self-stretch w-full items-start rounded border pb-0 mt-4 mx-1 pl-4 pr-4 pt-4 border-solid border-zinc-800 max-md:max-w-full"
    placeholder={`*EXAMPLE PROPOSAL* TITLE: Ape Fest 2024 

PROPOSAL CATEGORY: 
Ecosystem Fund Allocation 

TEAM DESCRIPTION: 
The core team for Ape Fest consists of professionals with expertise in event production, artist management, marketing, and finance. We have successfully organized several large-scale events in the past and are confident in our ability to deliver a high-quality festival experience. 

ABSTRACT: 
We propose to create "Ape Fest," a music festival that is powered by ApeCoin and showcases Ape branding. The festival will feature renowned artists from various genres and provide a unique platform for promoting ApeCoin and its ecosystem. 

BENEFITS TO APECOIN ECOSYSTEM: 
Ape Fest will generate significant brand exposure for ApeCoin, attracting both crypto enthusiasts and music lovers. The festival will drive increased adoption of ApeCoin as attendees will be encouraged to use it for various transactions within the event, such as ticket purchases, merchandise, and food and beverage payments. Additionally, partnering with renowned artists will create a buzz around ApeCoin and position it as a forward-thinking token and community. 

PLATFORMS AND TECHNOLOGIES: 
Ticketing, operations, and communications with attendees for the festival will be managed through the Dice ticketing platform as well as Ape social media channels. 

STEPS TO IMPLEMENT & TIMELINE: 
Ape Fest will take place over three days at a spacious outdoor venue capable of accommodating thousands of attendees. We will leverage blockchain technology to facilitate secure and seamless transactions using ApeCoin. The estimated cost for implementing Ape Fest is $3,000,000, which includes venue rental, artist fees, marketing expenses, security, and logistical arrangements. 

Month 1-2: Secure venue, finalize artist lineup, and develop the ApeCoin mobile app. 
Month 3-6: Execute marketing and promotional campaigns, finalize partnerships with vendors, and set up ticketing systems. 
Month 7-9: Conduct pre-event preparations, coordinate logistics, and engage with the ApeCoin community. 
Month 10-12: Host Ape Fest, evaluate its success, and gather feedback for future improvements. 

COST: 
The overall cost to implement Ape Fest is estimated at $3,000,000. We are seeking funding support from the Ape Foundation to cover these expenses and ensure the successful execution of the music festival.`}
/>
            </div>
              <button
                type="submit"
                className="text-sm mt-1 ml-[58vh] font-normal h-10 text-white w-20 rounded-3xl border border-blue-800 hover:bg-blue-700 hover:text-white focus:z-10 focus:ring-4"
              >
                Generate
            </button>
            </form>
          
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