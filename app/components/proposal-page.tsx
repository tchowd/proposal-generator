'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useChat } from 'ai/react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import '../globals.css';

function ProposalPage() {
  const [team, setTeam] = useState('');
  const [abstract, setAbstract] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVillageAI, setShowVillageAI] = useState(false);
  const [benefits, setBenefits] = useState('');
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
  const [showMilestones, setShowMilestones] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const descriptionRef = useRef(null);


  const bioRef = useRef<null | HTMLDivElement>(null);

  const descriptionRef = useRef<HTMLTextAreaElement | null>(null); // Add type to useRef

  const handleCopyToClipboard = () => {
    if (descriptionRef.current) {
      const textarea = descriptionRef.current as HTMLTextAreaElement;
      textarea.select();
      document.execCommand('copy');
    }
  };
  
  const handleButtonClick = () => {
    handleCopyToClipboard();
    setIsClicked(true);
    // setIsSubmitted(true);
}


  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      body: {
        abstract, title, category, team, benefits, keyTerms, specs, steps, time, cost
      },
    });

    
// const handleInputChange = useCallback((e) => {
  const handleAbstractInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    setAbstract(e.target.value);
    setIsSubmitted(false);
}, [handleInputChange, setIsSubmitted]);


  // const handleAbstractInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //     handleInputChange(e);
  //     setAbstract(e.target.value);
  // };
  
  const handleTitleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleInputChange(e);
      setTitle(e.target.value);
  }, [handleInputChange]);

  const handleTeamInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    setTeam(e.target.value);
};

const handleBenefitsInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    setBenefits(e.target.value);
};



const handleCategoryInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  handleInputChange(e as any); // Forcing type "any" as a workaround, but not the best practice
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
  

  const onSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(e);
    setIsSubmitted(true);
  };


  useEffect(() => {
    if (title !== formattedBios) {
      setTitle(formattedBios);
    }
    if (description !== processedData) {
      setDescription(processedData);
    }
  }, [formattedBios, processedData, title, description]);
  
  // const [milestones, setMilestones] = useState([]); // Assuming initial state is an empty array
  const [tooltipVisible, setTooltipVisible] = useState<Array<boolean>>([]);
  type Milestone = {
    description: string;
    date: string;
  };
  
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const addMilestone = () => {
    const newMilestone = {
      description: '', // default empty string or you can set a placeholder
      date: '', // default empty string or you can set a placeholder
    };
    setMilestones([...milestones, newMilestone]);
  };

  const removeMilestone = (indexToRemove: any) => {
    const newMilestones = milestones.filter((_, index) => index !== indexToRemove);
    setMilestones(newMilestones);
};

  const toggleTooltip = (index: number) => {
    setTooltipVisible(prevTooltipVisible => {
        const newTooltipVisible = [...prevTooltipVisible];
        newTooltipVisible[index] = !newTooltipVisible[index];
        return newTooltipVisible;
    });
};


  return (
    <>

      <div className='mr-[16px] ml-[16px] mt-6'>  
            <form onSubmit={onSubmit} className='overflow-x-hidden overflow-y-scroll scrollbar-hide ml-[16px] '>
            <div className='w-full flex overflow-y-scroll' > 
            <div className='w-1/2 pr-4 text-white overflow-scroll rounded-lg z-50 focus:ring-4 focus:ring-gray-200 relative'  style={{ height: '65vh', zIndex: 9999 }} >
                  <div className='flex flex-col '> 
                  <div className='flex '>
                  <h1 className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>Abstract </h1>
                  <div
                      className="hover:text-blue-700 hover:cursor-pointer relative tooltip-wrapper tooltip"
                      onClick={() => toggleTooltip(0)}
                  >
                      <AiOutlineQuestionCircle style={{ marginTop: '2px', marginLeft: '0.5rem' }} />
                      <div 
                          style={{ width: '500px' }}
                          className="absolute top-0 left-full m-2 bg-[#0054F9] text-white p-2 rounded shadow-lg tooltip
                          text-neutral-200 text-xs leading-[183.33%] self-stretch"
                      >
                          Provide a brief introduction of yourself and your team if you’re requesting funding. If you’re seeking funding, each team member set to receive funds must separately sign a grant agreement and undergo KYC verification before funds are released.
                      </div>
                  </div>



                  </div>
                  <textarea
                      // required
                      value={abstract}
                      onChange={handleAbstractInputChange}
                      placeholder='i.e. Proposal for Ape Energy, An energy drink with Ape branding'
                      rows={1}
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px resize-none"
                  />
                  <div className="text-neutral-200 text-xs opacity-50 w-full mt-3 max-md:max-w-full">
                    Tip: you can give a short description to get a proposal. But the more details you add, the better the proposal will be.
                  </div>
                  </div>
                  <div className="border-dashed border-amber-400 items-start flex w-full h-px flex-col mt-3 border-b-blue-600 border-b border-solid max-md:max-w-full" />

                  <div className='flex flex-col mt-4'> 
                  <div className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>
                    Title 
                  </div>
                  <textarea
                      onChange={handleTitleInputChange}
                      // value={title}
                      placeholder='i.e. Enter team description'
                      rows={1}
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px resize-none"
                  />
                  </div>
                    <div className='flex flex-col mt-4'> 
                    <div className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>
                    Proposal Category 
                    </div>

                     <label  htmlFor="category-select" className="mt-3 w-full flex flex-col items-start p-2.5 bg-transparent border border-solid border-zinc-800 rounded-lg text-xs text-neutral-400 opacity-50">
                        Select Category
                        <select 
                            id="category-select" 
                            className="mt-2 w-full bg-transparent text-white rounded-lg"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCategoryInputChange(e)}
                            value={category}>
                            <option value="brand">Brand Decision</option>
                            <option value="fund">Fund Allocation</option>
                            <option value="informational">Informational</option>
                            <option value="process">Process</option>
                        </select>
                    </label>

                  </div>
                  <div className='flex flex-col mt-4'> 
                  <div className='flex'>
                  <h1 className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>Team Description </h1>
                  <div
                    className={`hover:text-blue-700 hover:cursor-pointer relative tooltip-wrapper ${tooltipVisible[1] ? 'active' : ''}`}
                    onClick={() => toggleTooltip(1)}
                  >
                    <AiOutlineQuestionCircle style={{ marginTop: '2px', marginLeft: '0.5rem' }} />
                    <div 
                      style={{ width: '500px' }}
                      className="absolute top-0 left-full m-2 bg-[#0054F9] text-white p-2 rounded shadow-lg tooltip text-neutral-200 text-xs leading-[183.33%] self-stretch"
                    >
                      Provide a brief introduction of yourself and your team if you’re requesting funding. If you’re seeking funding, each team member set to receive funds must separately sign a grant agreement and undergo KYC verification before funds are released.
                    </div>
                  </div>
                  </div>
                  <textarea
                      onChange={handleTeamInputChange}
                      value={team}
                      placeholder='i.e. Enter team description'
                      rows={1}
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px resize-none"
                      />
                  </div>  
                  <div className='flex flex-col mt-4'>  
                  <div className='flex'>
                  <h1 className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>BENEFIT TO APECOIN ECOSYSTEM </h1> 
                  <div
                    className={`hover:text-blue-700 hover:cursor-pointer relative tooltip-wrapper tooltip  ${tooltipVisible[2] ? 'active' : ''}`}
                    style={{zIndex: 9999 }}
                    onClick={() => toggleTooltip(2)}
                  >
                    <AiOutlineQuestionCircle style={{ marginTop: '2px', marginLeft: '0.5rem' }} />
                    <div 
                      style={{ width: '500px', zIndex: 9999 }} // Increase the z-index value for the tooltip
                      className="absolute top-0 left-full m-2 bg-[#0054F9] text-white p-2 rounded shadow-lg tooltip text-neutral-200 text-xs leading-[183.33%] self-stretch z-auto"
                    >
                      Explain how your proposal will benefit the ApeCoin ecosystem, and how it aligns with the APE Community’s core mission and values. This section will be visible to voters on Snapshot.
                    </div>
                  </div>
                  </div>
                  <textarea
                      onChange={handleBenefitsInputChange}
                      value={benefits}
                      placeholder='i.e. A new way to bring more attention to the Ape brand'
                      rows={1}
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px resize-none"
                  />
                  </div>

                  <div className='flex flex-col  mt-4'> 
                  <div className='flex '>
                  <h1 className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'> Key Terms (optional)  </h1> 

                  <div
                    className={`hover:text-blue-700 hover:cursor-pointer relative tooltip-wrapper ${tooltipVisible[3] ? 'active' : ''}`}
                    onClick={() => toggleTooltip(3)}
                  >
                    <AiOutlineQuestionCircle style={{ marginTop: '2px', marginLeft: '0.5rem' }} />
                    <div 
                      style={{ width: '500px' }}
                      className="absolute top-0 left-full m-2 bg-[#0054F9] text-white p-2 rounded shadow-lg tooltip text-neutral-200 text-xs leading-[183.33%] self-stretch"
                    >
                      Definitions of any terms within the proposal that are unique to the proposal, new to the APE Community, and/or industry-specific (optional).
                    </div>
                  </div>
                  </div>
                  <textarea
                      onChange={handleKeyTermsInputChange}
                      value={keyTerms}
                      placeholder='i.e. 3PL = 3rd party logistics'
                      rows={1}
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px resize-none"
                  />
                  </div>

                  <div className='flex flex-col  mt-4'> 
                  <div className='flex'>
                   
                  <h1 className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'> PLATFORMS & TECHNOLOGIES  </h1> 

                  <div
                    className={`hover:text-blue-700 hover:cursor-pointer relative tooltip-wrapper ${tooltipVisible[4] ? 'active' : ''}`}
                    onClick={() => toggleTooltip(4)}
                  >
                    <AiOutlineQuestionCircle style={{ marginTop: '2px', marginLeft: '0.5rem' }} />
                    <div 
                      style={{ width: '500px' }}
                      className="absolute top-0 left-full m-2 bg-[#0054F9] text-white p-2 rounded shadow-lg tooltip text-neutral-200 text-xs leading-[183.33%] self-stretch"
                    >
                      A detailed breakdown of the platforms and technologies that will be used, if any.
                    </div>
                  </div>
                  </div>
                  <textarea
                      onChange={handleSpecsInputChange}
                      value={specs}
                      placeholder='i.e. Pietra (https://www.pietrastudio.com/new-brands)'
                      rows={1}
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px resize-none"
                  />
                  </div>

                  <div className='flex flex-col  mt-4'> 
                  <div className='flex '>
                  <h1 className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>  STEPS TO IMPLEMENT & TIMELINE  </h1> 

                  <div
                    className={`hover:text-blue-700 hover:cursor-pointer relative tooltip-wrapper ${tooltipVisible[4] ? 'active' : ''}`}
                    onClick={() => toggleTooltip(5)}
                  >
                    <AiOutlineQuestionCircle style={{ marginTop: '2px', marginLeft: '0.5rem' }} />
                    <div 
                      style={{ width: '500px' }}
                      className="absolute top-0 left-full m-2 bg-[#0054F9] text-white p-2 rounded shadow-lg tooltip text-neutral-200 text-xs leading-[183.33%] self-stretch"
                    >
                            Outline the steps to implement your proposal, including the associated costs, key performance indicators, personnel requirements, any expectations of the Ape Foundation, and other resources needed for each step where applicable. This section also provides relevant timing details, including the project’s start date and key milestones.
                          </div>
                    </div>
                  </div>
                  <textarea
                      onChange={handleStepsInputChange}
                      value={steps}
                      placeholder='i.e. Only one person needed 1. design products 2. source manufacturers, $15,000 3. set up digital shop'
                      rows={1}
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px resize-none"
                  />
                  </div>

                  <div className='flex flex-col mt-4'>
            <div className='flex '>
              <h1 className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>  Key Milestones  </h1> 

              <div
                    className={`hover:text-blue-700 hover:cursor-pointer relative tooltip-wrapper ${tooltipVisible[4] ? 'active' : ''}`}
                    onClick={() => toggleTooltip(6)}
                  >
                    <AiOutlineQuestionCircle style={{ marginTop: '2px', marginLeft: '0.5rem' }} />
                    <div 
                      style={{ width: '500px' }}
                      className="absolute top-0 left-full m-2 bg-[#0054F9] text-white p-2 rounded shadow-lg tooltip text-neutral-200 text-xs leading-[183.33%] self-stretch"
                    >
                          Outline the steps to implement your proposal, including the associated costs, key performance indicators, personnel requirements, any expectations of the Ape Foundation, and other resources needed for each step where applicable. This section also provides relevant timing details, including the project’s start date and key milestones.                          </div>
                        
                    </div>
                  </div>
                  {/* <button onClick={() => setShowMilestones(!showMilestones)}>
                    Toggle Milestones
                  </button> */}

                  {/* Button to add a new milestone */}
                  <button onClick={addMilestone} className='mt-4 flex text-neutral-200 text-xs leading-[183.33%] self-stretch group'>
                      <label
                          htmlFor="milestone-input"
                          className="justify-center hover:cursor-pointer mr-2 items-center rounded border self-center flex w-4 max-w-full flex-col my-auto border-solid border-blue-600 group-hover:border-green-500"
                      >
                          <img
                              loading="lazy"
                              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1dd1ce48-660a-45e0-b147-cc0fcfae3904?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&"
                              className="aspect-square object-cover object-center w-full overflow-hidden self-stretch grow"
                              alt="Milestone Image"
                          />
                      </label>
                      <h2 className=''>Add Milestone</h2>
                  </button>


                  {milestones.length > 0 && milestones.map((milestone, index) => (
                        <div key={index} className='ml-10 mt-2'>
                      <div className="items-start flex w-full gap-2.5 mt-3 max-md:max-w-full max-md:flex-wrap">
                      <button
                        onClick={() => removeMilestone(index)}
                        className="justify-center items-center rounded self-center flex w-4 max-w-full flex-col my-auto border-[0.5px] border-solid border-blue-600 hover:border-red-500">
                        <img 
                            loading="lazy" 
                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/aa818d25-11e4-4493-ac02-8e997dfa5020?apiKey=d695cb273b1e4ee4bdb4f7c085ba03d0&"
                            className="aspect-square object-cover object-center w-full overflow-hidden self-stretch grow"
                        />
                    </button>

                        <div className="items-end self-stretch flex flex-col grow shrink-0 basis-auto pl-5 max-md:max-w-full">
                          <div className="justify-end items-start flex w-[529px] max-w-full gap-2.5 max-md:flex-wrap">
                            <div className="text-neutral-200 text-xs leading-[183.33%] self-center my-auto">Milestone</div>
                            <textarea
                                placeholder={'i.e. Design Products'}
                                rows={1}
                                className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                                items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                                text-neutral-400 text-xs opacity-50 max-w-full -mt-px resize-none"
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
                            <div className="text-neutral-200 text-xs leading-[183.33%] self-center my-auto"> Time</div>
                            <textarea
                                placeholder={'i.e. 10/10/2021'}
                                rows={1}
                                className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                                items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                                text-neutral-400 text-xs opacity-50 max-w-full -mt-px resize-none"
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
                   <div className='flex flex-col  mt-4 mb-5'> 
                  <div className='flex '>
                  <h1 className='flex text-neutral-200 text-xs leading-[183.33%] uppercase self-stretch'>  Overall Cost </h1> 

                  <div
                    className={`hover:text-blue-700 hover:cursor-pointer relative tooltip-wrapper ${tooltipVisible[4] ? 'active' : ''}`}
                    onClick={() => toggleTooltip(7)}
                  >
                    <AiOutlineQuestionCircle style={{ marginTop: '2px', marginLeft: '0.5rem' }} />
                    <div 
                      style={{ width: '500px' }}
                      className="absolute top-0 left-full m-2 bg-[#0054F9] text-white p-2 rounded shadow-lg tooltip text-neutral-200 text-xs leading-[183.33%] self-stretch"
                    >
                            Summarize the total budget associated with implementing the proposal. This section will be visible to voters on Snapshot.
                          </div>
                        
                    </div>
                  </div>
                  <textarea
                      placeholder={'ie. $15,000'}
                      onChange={handleCostInputChange}
                      value={cost}
                      rows={1}
                      className="w-full mt-3 bg-transparent p-2 text-white rounded-lg border border-custom-gray
                      items-start rounded border flex w-full grow flex-col mt-2 pl-2.5 pr-5 py-2.5 border-solid border-zinc-800 max-md:max-w-full 
                      text-neutral-400 text-xs opacity-50 max-w-full -mt-px resize-none"
                  />
                  </div>              
            </div>
              <div className="flex flex-col items-start w-1/2 z-0" style={{zIndex: 0}}>
              <div className="text-neutral-200 text-base font-medium leading-[100%] uppercase self-stretch mb-4">
                  Preview
                </div>
              <textarea 
                  ref={descriptionRef}
                  value={description} 
                  style={{ width: '100%', height: '65vh', whiteSpace: "pre-wrap", zIndex: 0}}
                  onChange={(e) => setDescription(e.target.value)} 
                  className="bg-transparent p-2 text-white rounded-lg border border-custom-gray text-neutral-400 text-xs rounded border-solid border-zinc-800 resize-none overflow-y-auto"
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
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitted}
                className="mt-2 left-4 text-center text-base font-bold leading-[146.667%] self-stretch justify-center items-center px-5 py-2 rounded-[100px] text-white bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                Generate
            </button>
            <button
                onClick={handleButtonClick}
                className={`absolute mt-2 mr-[16px] right-4 mb-52 text-white text-center text-base font-bold leading-[146.667%] self-stretch justify-center items-center border px-5 py-2 rounded-[100px] border-solid ${isClicked ? 'border-green-600' : 'border-blue-600'}`}> 
                Copy to clipboard
            </button>
            </div>

            </form>
          
         
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
