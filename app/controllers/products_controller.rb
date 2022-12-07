class ProductsController < ApplicationController

    # before_action :authorize

    def index
        products = Product.all
        render json: products

    end

    def show
        product = Product.find(params[:id])
        render json: product
    end

    def create
        product = Product.create!(product_params)
        render json: product
    end

    def update
        product = Product.find(params[:id])
        product.update!(product_params)
        render json: product
    end

    def destroy
        product = Product.find(params[:id])
        product.destroy 
        head 
    end

    private

    def product_params
        params.permit(:name, :manufacturer, :description, :review, :link, :rating)
    end

    # def authorize
    #     return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    # end

end
