import { utilService } from '../../../services/util.service.js'
const { useState, useEffect } = React

export function MailPreview({ mail, onRemoveMail, isSent, onMark }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isStarred, setIsStarred] = useState(mail.isStarred ? true : false)

    const sentDate = new Date(mail.sentAt)
    const isRead = mail.isRead
    let displayedContent

    if (isHovered) {
        displayedContent = (
            <div className="actions-container flex align-center">
                <button
                    className="btn"
                    onClick={onDeleteBtn}
                >
                    <i className=" ri-delete-bin-line"></i>
                </button>
                {isRead &&
                    <button
                        className="btn"
                        onClick={onMarkReadBtn}
                    >
                        <i className="ri-mail-unread-line"></i>
                    </button>
                }
                {!isRead &&
                    <button
                        className="btn"
                        onClick={onMarkReadBtn}
                    >
                        <i className="ri-mail-open-line"></i>
                    </button>
                }

            </div>
        )
    } else {
        if (utilService.isSameDay(Date.now(), sentDate)) {
            displayedContent = utilService.getFormattedTime(sentDate)
        } else if (utilService.isSameYear(Date.now(), sentDate)) {
            displayedContent = utilService.getFormattedDayMpnth(sentDate)
        } else {
            displayedContent = utilService.getFormattedDate(sentDate)
        }
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    function onDeleteBtn(ev) {
        ev.stopPropagation()
        onRemoveMail(mail.id)
    }

    function onMarkReadBtn(ev) {
        ev.stopPropagation()
        onMark(mail.id, 'isRead')
    }

    function onStarClick(ev){
        ev.stopPropagation()
        setIsStarred((prevIsStarred) => !prevIsStarred)
        onMark(mail.id, 'isStarred')
    }

    const dynClassTxt = (!mail.isRead) ? 'un-read-txt' : ''
    const dynClassBgc = (!mail.isRead) ? 'un-read-bgc' : ''

    return (
        <article
            className={`mail-preview ${dynClassBgc}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button 
                className={`btn btn-starred ${isStarred ? 'starred' : ''}`} 
                onClick={(onStarClick)}
                >
                <i className="fa-regular fa-star"></i>
            </button>
            {!isSent &&
                <span className={`mail-from ${dynClassTxt}`}>
                    {mail.from}
                </span>
            }
            {isSent &&
                <span className="mail-from">{`To: ${mail.to}`}</span>
            }
            <section>
                <p className={`mail-subject ${dynClassTxt}`}>
                    {`${mail.subject} `}
                </p>
                <p className="mail-body">{mail.body}</p>
            </section>
            <span className={`mail-sentAt ${dynClassTxt}`}>{displayedContent}</span>
        </article >
    )
}
