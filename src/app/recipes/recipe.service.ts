import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    recipesChanged  = new Subject<Recipe[]>()

    // private recipes: Recipe[] = [
    //     new Recipe ('A Test Recipe', " A simple Description", 'https://picsum.photos/300',[
    //         new Ingredient('Lol',1),
    //         new Ingredient('lmfao',3)
    //     ]),
    //     new Recipe('Another Test Recipe', " A simple Description", 'https://picsum.photos/300',[
    //         new Ingredient('Lola',1),
    //         new Ingredient('lmfaok',3)
    //     ])
    //   ];
    private recipes : Recipe[] = [];

    constructor(private slService:ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes.slice()[index]
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients)
    }
    addRecipe(recipe : Recipe){
       this.recipes.push(recipe)
       this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index : number , newRecipe : Recipe){
        this.recipes[index] = newRecipe;
       this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number){
        this.recipes.splice(index,1)
        this.recipesChanged.next(this.recipes.slice())
    }

    setRecipes(recipes : Recipe[]){
        this.recipes = recipes
        this.recipesChanged.next(this.recipes.slice()) 
    }
}