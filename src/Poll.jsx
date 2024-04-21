import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const Poll = ({ data }) => {
	const [currentQuestionSet, setCurrentQuestionSet] = useState(null);
	const parsedData = JSON.parse(data.pollJson);
	const setName = Object.keys(JSON.parse(data.pollJson));

	useEffect(() => {
		const questions = localStorage.getItem(setName);
		if (!questions) {
			localStorage.setItem(setName, JSON.stringify(parsedData[setName]));
			setCurrentQuestionSet(parsedData[setName]);
		} else {
			setCurrentQuestionSet(JSON.parse(questions));
		}
	}, [])

	const handleVoteSubmit = (questionToSubmit) => {
		const isAnyOptionSelected = questionToSubmit.options.find(option => option.selected === true)
		if (isAnyOptionSelected) {
			questionToSubmit.totalVotes += 1;
			const persistentQuestionsStorage = JSON.parse(localStorage.getItem(setName));
			const updatedQuestionSet = persistentQuestionsStorage.map(question => question.id === questionToSubmit.id ? {
				...questionToSubmit, options: questionToSubmit.options.map(option => {
					if (option.selected === true) {
						return { ...option, votes: option.votes + 1, selected: false }
					} else {
						return { ...option, selected: false }
					}
				})
			} : {
				...currentQuestionSet.find(q => q.id === question.id)
			});

			localStorage.setItem(setName, JSON.stringify(updatedQuestionSet));
			setCurrentQuestionSet(updatedQuestionSet)
		}
	}

	const handleOptionChange = (questionId, optionId) => {
		setCurrentQuestionSet((prevQuestions) => {
			return prevQuestions.map(question => (
				question.id === questionId ? {
					...question,
					options: question.options.map(option => (
						option.id === optionId ? { ...option, selected: true } : { ...option, selected: false }
					))
				} : question
			))
		})
	}

	return (
		<div className='w-full min-w-[320px] max-w-[640px]'>
			{
				currentQuestionSet && currentQuestionSet?.map(question => {
					return (
						<div className='group shadow p-4 mb-8 border rounded-lg' key={question.id}>
							<p className='text-xl mb-6 font-bold text-sky-950'>{question.question}</p>
							{
								question?.options?.map((option) => {
									return (
										<div key={option.id} className={`group/labelContainer flex items-center border-[3px] border-sky-400 border-opacity-30 rounded-md mb-2 hover:border-sky-500 ${option.selected ? "border-sky-500 !border-opacity-100" : ''}`} >
											<input type="radio" checked={option.selected} className='hidden' name={`question-${question.id}`} value={option.id} id={option.id} onChange={() => handleOptionChange(question.id, option.id)} />
											<label htmlFor={option.id} className={`group/label  relative w-full text-md p-2 cursor-pointer font-medium flex justify-between items-center ${option.selected ? "!font-bold" : ""}`}>
												<span className='w-10/12 z-10'>{option.option}({option.votes} {option.votes !== 1 ? "votes" : "vote"})</span> <div style={{ width: `${Math.floor((option.votes / question.totalVotes) * 100)}%` }} className='absolute left-0 h-full bg-sky-400 opacity-30'></div>
												<span className={`absolute font-black bg-white p-1 rounded-md text-sky-700 right-[10px] ${question.totalVotes > 0 ? "inline-block" : "inline-block"}`}>{question.totalVotes > 0 ? Math.floor((option.votes / question.totalVotes) * 100) : 0}%</span>
											</label>
										</div>
									)
								})
							}
							<div className='flex items-center justify-between mt-4'>
								<div>
									<span className='text-sm font-bold text-sky-700'>{question.totalVotes} {question.totalVotes !== 1 ? "votes" : "vote"}</span>
									<span className='opacity-20 mx-1'>|</span>
									<span className='text-sm font-medium text-sky-950 opacity-40'>{new Date(question.date).toDateString()}</span>
								</div>
								<button className='font-bold p-2 px-4 rounded-lg bg-sky-700 text-white' onClick={() => handleVoteSubmit(question)}>Select option</button>
							</div>
						</div>
					)
				})
			}
		</div >
	)
}

export default Poll