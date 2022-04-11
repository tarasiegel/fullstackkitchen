import * as React from "react";
import PropTypes from 'prop-types';
import RecipeSEO from './recipeSEO';
import './recipe.css';
import { GatsbyImage } from "gatsby-plugin-image";
import $ from 'jquery';

const Recipe = (props) => {

    const getRecipeSection = (recipe) => {
        let recipeHtml = [];
        recipe.forEach((rec, sec) => {
            recipeHtml.push(<RecipeSection recipe={rec} sectionKey={sec} key={sec} />);
        })
        return recipeHtml;
    }

    const { name, recipe, image } = props;
    const recipeSections = getRecipeSection(recipe);
    
    return (
        <div className="recipe">
            <RecipeSEO data={recipe[0]} image={image} {...props}  />
            <div className="recipe__image">
                <GatsbyImage image={image} alt={name}/>
            </div>
            <h3 className="recipe__title">{name}</h3>
            {recipeSections}
        </div>
    );
}


class RecipeSection extends React.Component {

    componentDidMount() {
        $('.instruction-item').on({
            mouseenter: (e) => {
                this.instructionHovered(e);
            },
            mouseleave: (e) => {
                this.instructionLeft(e);
            },
            click: (e) => {
                this.instructionClicked(e);
            }
        }
        );
    }

    getTime = (time) => {
        let hours = Math.floor( time / 60);
        let minutes = time % 60;
        let timeString = '';

        if (hours > 0) {
            timeString += `${hours} hour${(hours > 1) ? 's' : ''}`;
            timeString += (minutes > 0) ? ` & ` : '';
        }

        if (minutes > 0) {
            timeString += `${minutes} minutes`;
        }

        return timeString;
    }

    getRefData = (ingredients) => {
        let refData = [];
        ingredients.forEach((ingSection, sectionKey) => {
            const refSectionData = ingSection.data.map((ings) => {
                return (ings.reference) ? ings.reference : false;
            });

            refData.push(refSectionData);
        });
        return refData;
    }

    
    
    instructionClicked = (e) => {
        let inputDiv = e.target,
            ref = inputDiv.dataset.ref, 
            $refDiv = $(`#ingredient--${ref} input`);

        $refDiv.prop('checked', !$refDiv.prop('checked'));
        this.strikeOutIngredient($(inputDiv), $refDiv);
    }
    
    instructionHovered = (e) => {
        let inputDiv = e.target,
            ref = inputDiv.dataset.ref;

        $(`#ingredient--${ref}`).addClass('hover');
    }

    instructionLeft = (e) => {
        let inputDiv = e.target,
            ref = inputDiv.dataset.ref;

        $(`#ingredient--${ref}`).removeClass('hover');
    }

    strikeOutIngredient = (refDiv, inputDiv) => {
        if (refDiv !== null) {
            const decoration = (inputDiv.prop('checked')) ? 'line-through' : 'underline';
            refDiv.attr('style', `text-decoration: ${decoration};`);
        }
    }


    updateInstruction = (instruction, refData, recipeSectionKey) => {
        let updatedInstruction = instruction;
        refData.forEach((sec, secKey) => {
            sec.forEach((ref, refKey) => {
                console.log(ref);
                if (updatedInstruction.indexOf(ref) !== -1) {
                    const fullRefKey = `${recipeSectionKey}-${secKey}-${refKey}`;
                    updatedInstruction = updatedInstruction.replace(ref, `<span id="ref-${fullRefKey}" class="instruction-item" data-ref="${fullRefKey}" data-ingredient="${ref}" key="${refKey}" >${ref}</span>`);
                }
            });
        });
        return updatedInstruction;
    }


    render() {
        const {recipe, sectionKey} = this.props,
            refData = this.getRefData(recipe.ingredients),
            ingredientHTML = recipe.ingredients.map((ing, key) => {
                return <RecipeIngredients key={key} ingredientData={ing} sectionKey={sectionKey} ingredientKey={key} strikeOutIngredient={this.strikeOutIngredient} />
            }),
            directionsHTML = recipe.instructions.map((ins, key) => {
                return <div className="recipe__instruction recipe__paragraph" index={key} key={key} dangerouslySetInnerHTML={{ __html: this.updateInstruction(ins, refData, sectionKey)}} />
            }),
            assemblyHTML = (recipe.assembly) ? recipe.assembly.map((ass, key) => {
                return <div className="recipe__assembly recipe__paragraph" index={key} key={key} dangerouslySetInnerHTML={{ __html: ass}} />
            }) : [];

        return (
            <div className={`recipe__section recipe__section--${sectionKey}`}>
                {(recipe.subTitle) ? <h3 className="recipe__sub-title">{recipe.subTitle}</h3> : null }
                <div className="recipe__time">
                    <em className="recipe__yield">{recipe.yield}</em>
                    <div className="recipe__prep-time">{`Prep: ${this.getTime(recipe.prepTime)}`}</div>
                    <div className="recipe__cook-time">{`Cook: ${this.getTime(recipe.cookTime)}`}</div>
                    <div className="recipe__total-time">{`Total: ${this.getTime(recipe.totalTime)}`}</div>
                </div>

                <div className="recipe__content">
                    <div className="recipe__ingredients-container">
                        <div className="recipe__ingredients-title recipe__section-title">Ingredients</div>
                        {ingredientHTML}
                    </div>

                    <div className="recipe__instructions-container">
                        <div className="recipe__instructions-title recipe__section-title">Directions</div>
                        {directionsHTML}
                        
                        {(assemblyHTML.length > 0) ? 
                            <div className="recipe__assembly-container">
                                <div className="recipe__assembly-title recipe__section-title">Assembly</div>
                                {assemblyHTML}
                            </div> 
                            : null
                        }
                    </div>
                </div>

            </div>
        )
    }
}

class RecipeIngredients extends React.Component {
    static propTypes = {
        ingredientData: PropTypes.object
    }
    static defaultProps = {
        ingredientData: []
    }


    inputClicked = (e) => {
        let inputDiv = e.target,
            ingredient = inputDiv.dataset.ingredient,
            refDiv = $(`#ref-${ingredient}`);
        this.props.strikeOutIngredient(refDiv, $(inputDiv));
    }

    render() {
        const {ingredientData, sectionKey, ingredientKey} = this.props;
        const ingHtml = ingredientData.data.map((ing, key) => {
            const ingredientText = (typeof ing === 'object') ? ing.text : ing;
            const referenceKey = `${sectionKey}-${ingredientKey}-${key}`;
            return (
                <li id={`ingredient--${referenceKey}`} key={key} className={`ingredient-section__ingredient-item ingredient--${referenceKey}`} data-name={((ing.reference) ? ing.reference : ing)}>
                    <input className="ingredient-section__ingredient-item-input" type="checkbox" id={`cbx-${referenceKey}`} data-ingredient={`${referenceKey}`} onClick={this.inputClicked} />
                    <label htmlFor={`cbx-${referenceKey}`} className="check">
                        <svg width="16px" height="16px" viewBox="0 0 16 16">
                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C14,1 15,2 15,3.5 L15,14.5 C15,14 14,15 14.5,15 L3.5,15 C2,15 1,14 1,14.5 L1,9 Z"></path>
                            <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                    </label>
                    <div dangerouslySetInnerHTML={{ __html: ingredientText}} />
                </li>)
        });

        return (
            <div className="ingredient-section">
                <div className="ingredient-section__title">{ingredientData.title}</div>
                <div className="ingredient-section__ingredients">
                    {ingHtml}
                </div>
            </div>
        )
    }
}

export default Recipe;
