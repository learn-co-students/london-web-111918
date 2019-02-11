class JournalEntriesController < ApplicationController
  before_action :authenticate_user
  before_action :set_journal_entry, only: [:show, :update, :destroy]

  # GET /journal_entries
  def index
    @journal_entries = current_user.journal_entries

    render json: @journal_entries
  end

  # GET /journal_entries/1
  def show
    render json: @journal_entry
  end

  # POST /journal_entries
  def create
    usr = current_user

    @journal_entry = JournalEntry.new(journal_entry_params)
    @journal_entry.user_id = usr.id

    if @journal_entry.save
      render json: @journal_entry, status: :created, location: @journal_entry
    else
      render json: @journal_entry.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /journal_entries/1
  def update
    if @journal_entry.update(journal_entry_params)
      render json: @journal_entry
    else
      render json: @journal_entry.errors, status: :unprocessable_entity
    end
  end

  # DELETE /journal_entries/1
  def destroy
    @journal_entry.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_journal_entry
      @journal_entry = JournalEntry.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def journal_entry_params
      params.require(:journal_entry).permit(:note, :mood, :location)
    end
end
