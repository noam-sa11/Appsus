const { NavLink } = ReactRouterDOM
const { useState, useEffect } = React

// const isMenuOpenn = true;

export function MailAsideToolBar({
    unreadMailsCount,
    onToggleAddMail,
    onChangeToInboxMails,
    onChangeToSentMails,
    onChangeToStarredMails,
    onChangeToDeletedMails }) {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 700)

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 700)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleToggleMenu = () => {
        if (isMobileView) {
            setMenuOpen(!isMenuOpen)
          }
    }


    const menuProps = isMobileView
    ? {}
    : {
        onMouseEnter: () => setMenuOpen(true),
        onMouseLeave: () => setMenuOpen(false),
      }

    return (
        <aside
            className={`mail-aside-tool-bar ${isMenuOpen ? 'open' : ''}`}
            {...menuProps}
        >
            {/* <button className="btn btn-bars" onClick={handleToggleMenu}>
                <i className="fa-solid fa-bars"></i>
            </button> */}

            {!isMenuOpen &&
                <div className="menu-actions grid justify-center align-center">
                    <button className="btn btn-compose" onClick={onToggleAddMail}>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </button>

                    <NavLink to="/mail">
                        <button className={`btn btn-inbox ${unreadMailsCount > 0 ? 'unread' : ''}`} onClick={onChangeToInboxMails}>
                            <i className="fa-solid fa-inbox"></i>
                        </button>
                    </NavLink>

                    <button className="btn btn-starred" onClick={onChangeToStarredMails}>
                        <i className="fa-regular fa-star"></i>
                    </button>

                    <button className="btn btn-sent" onClick={onChangeToSentMails}>
                        <i className="ri-send-plane-2-line"></i>
                    </button>

                    <button className="btn btn-trash" onClick={onChangeToDeletedMails}>
                        <i className="ri-delete-bin-line"></i>
                    </button>
                    <p></p>
                </div>
            }
            {isMenuOpen &&
                <div className="menu-actions grid justify-center align-center">
                    <div className="flex justify-center align-center" onClick={onToggleAddMail}>
                        <button className="btn btn-compose flex align-center" >
                            <i className="fa-regular fa-pen-to-square"></i><span>Compose</span>
                        </button>
                    </div>

                    <NavLink to="/mail">
                        <div className="aciton flex justify-center align-center" onClick={onChangeToInboxMails}>
                            <button className="btn btn-inbox">
                                <i className="fa-solid fa-inbox"></i>
                            </button>
                            <span className="txt-span">{`Inbox (${unreadMailsCount})`}</span>
                        </div>
                    </NavLink>

                    <div className="aciton flex justify-center align-center" onClick={onChangeToStarredMails}>
                        <button className="btn btn-starred">
                            <i className="fa-regular fa-star"></i>
                        </button>
                        <span className="txt-span">Starred</span>
                    </div>
                    <div className="aciton flex justify-center align-center" onClick={onChangeToSentMails}>
                        <button className="btn btn-sent" >
                            <i className="ri-send-plane-2-line"></i>
                        </button>
                        <span className="txt-span">Sent</span>
                    </div>
                    <div className="aciton flex justify-center align-center" onClick={onChangeToDeletedMails}>
                        <button className="btn btn-trash" >
                            <i className="ri-delete-bin-line"></i>
                        </button>
                        <span className="txt-span">Trash</span>
                    </div>
                    <p></p>
                </div>
            }
        </aside>
    )

}
