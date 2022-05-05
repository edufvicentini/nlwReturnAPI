import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const submitFeedback = new SubmitFeedbackUseCase(
  { create: async() => {} },
  { sendMail: async() => {}}
  )

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {   
      await expect(submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64123123test.jpg'
      })).resolves.not.toThrow()
  })

  it('should not be able to submit without type', async () => {   
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64123123test.jpg'
    })).rejects.toThrow()})

  it('should not be able to submit without comment', async () => {   
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64123123test.jpg'
    })).rejects.toThrow()})

    it('should not be able to submit with a invalid screenshot format', async () => {   
      await expect(submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'test.jpg'
      })).rejects.toThrow()})
})