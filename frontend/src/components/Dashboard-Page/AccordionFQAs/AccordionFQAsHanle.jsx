import { useState, useEffect } from "react"
import "./AccordionFQAs.css"
import MinusIcon from "../../../assets/Minus-Icon.svg";
import AddIcon from "../../../assets/Add-Icon.svg";

const AccordionsFQAs = ({ items, keepOthersOpen, title }) => {

    const [AccordionItems, setAccordionItems] = useState(null)

    useEffect(() => {
        if (items) {
            setAccordionItems([
                ...items.map(item => ({
                    ...item,
                    toggled: false
                }))
            ])
        }
    }, [items])

    function HandleAccordionToggle(ClickedItem) {
        setAccordionItems([
            ...AccordionItems.map((item) => {
                let toggled = item.toggled

                if (ClickedItem.id === item.id) {
                    toggled = !item.toggled
                } else if (!keepOthersOpen) {
                    toggled = false
                }

                return {
                    ...item, toggled
                }
            })
        ])
    }

    return (
        <section className="accordionFQAs-parent-container">
            <div className="accordionFQAs-wrapper" >
                <div className= "acordionFQAs-heading-container">
                    <h1 className="acordionFQAs-heading">
                        {title}
                    </h1>
                </div>

                {AccordionItems?.map((ListItem, index) => {
                    return (
                        <div className={`accorditon ${ListItem.toggled ? 'toggled' : ''}`} key={index}>
                            <button className= "accordionFQAs-toggle" onClick={() => HandleAccordionToggle(ListItem)}>
                                <div className= "accordionFQAs-questions-container">
                                    <div  className= "accordionFQAs-toggle-ID">
                                        <p>{ListItem.id}</p>
                                    </div>
                                    <p className= "accordionFQAs-label">{ListItem.label}</p>
                                </div>
                                <img className="accordionFQAs-direction" src={ListItem.toggled ? MinusIcon : AddIcon} alt="Toggle Icon" />
                            </button>

                            <div className="accordionFQAs-content-container">
                                <div className="accordionFQAs-content">
                                    {ListItem.renderContent()}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default AccordionsFQAs