"""initial schema

Revision ID: 0001_initial_schema
Revises:
Create Date: 2026-03-16
"""
from alembic import op
import sqlalchemy as sa
revision = '0001_initial_schema'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table('users', sa.Column('id', sa.String(), primary_key=True), sa.Column('email', sa.String(), nullable=False), sa.Column('hashed_password', sa.String(), nullable=False), sa.Column('first_name', sa.String(), nullable=False), sa.Column('last_name', sa.String(), nullable=False), sa.Column('role', sa.String(), nullable=False), sa.Column('is_active', sa.Boolean(), nullable=False), sa.Column('created_at', sa.DateTime(), nullable=False))
    op.create_index('ix_users_email', 'users', ['email'], unique=True)
    op.create_table('transports', sa.Column('id', sa.String(), primary_key=True), sa.Column('reference', sa.String(), nullable=False), sa.Column('status', sa.String(), nullable=False), sa.Column('origin_city', sa.String(), nullable=False), sa.Column('destination_city', sa.String(), nullable=False), sa.Column('goods_description', sa.String(), nullable=False), sa.Column('pallets', sa.Integer(), nullable=False), sa.Column('weight_kg', sa.Float(), nullable=False), sa.Column('price_chf', sa.Float(), nullable=False), sa.Column('price_recommended', sa.Float(), nullable=False), sa.Column('created_at', sa.DateTime(), nullable=False))
    op.create_index('ix_transports_reference', 'transports', ['reference'], unique=True)
    op.create_table('documents', sa.Column('id', sa.String(), primary_key=True), sa.Column('transport_id', sa.String(), nullable=False), sa.Column('filename', sa.String(), nullable=False), sa.Column('document_type', sa.String(), nullable=False), sa.Column('storage_path', sa.String(), nullable=False), sa.Column('created_at', sa.DateTime(), nullable=False))
    op.create_table('invoices', sa.Column('id', sa.String(), primary_key=True), sa.Column('transport_id', sa.String(), nullable=False), sa.Column('invoice_number', sa.String(), nullable=False), sa.Column('amount_chf', sa.Float(), nullable=False), sa.Column('status', sa.String(), nullable=False), sa.Column('created_at', sa.DateTime(), nullable=False))
    op.create_table('tracking_events', sa.Column('id', sa.String(), primary_key=True), sa.Column('transport_id', sa.String(), nullable=False), sa.Column('status', sa.String(), nullable=False), sa.Column('location', sa.String(), nullable=False), sa.Column('latitude', sa.Float(), nullable=True), sa.Column('longitude', sa.Float(), nullable=True), sa.Column('created_at', sa.DateTime(), nullable=False))
    op.create_table('time_entries', sa.Column('id', sa.String(), primary_key=True), sa.Column('user_id', sa.String(), nullable=False), sa.Column('transport_id', sa.String(), nullable=True), sa.Column('activity_type', sa.String(), nullable=False), sa.Column('duration_minutes', sa.Integer(), nullable=False), sa.Column('note', sa.Text(), nullable=False), sa.Column('created_at', sa.DateTime(), nullable=False))
    op.create_table('model_versions', sa.Column('id', sa.String(), primary_key=True), sa.Column('domain', sa.String(), nullable=False), sa.Column('version', sa.String(), nullable=False), sa.Column('status', sa.String(), nullable=False), sa.Column('dataset_size', sa.Integer(), nullable=False), sa.Column('created_at', sa.DateTime(), nullable=False))
    op.create_table('feedback_events', sa.Column('id', sa.String(), primary_key=True), sa.Column('domain', sa.String(), nullable=False), sa.Column('entity_id', sa.String(), nullable=False), sa.Column('predicted_label', sa.String(), nullable=False), sa.Column('corrected_label', sa.String(), nullable=False), sa.Column('comment', sa.Text(), nullable=False), sa.Column('created_at', sa.DateTime(), nullable=False))
    op.create_table('inference_logs', sa.Column('id', sa.String(), primary_key=True), sa.Column('domain', sa.String(), nullable=False), sa.Column('entity_id', sa.String(), nullable=False), sa.Column('model_version', sa.String(), nullable=False), sa.Column('prediction', sa.String(), nullable=False), sa.Column('confidence', sa.Float(), nullable=False), sa.Column('explanation', sa.Text(), nullable=False), sa.Column('created_at', sa.DateTime(), nullable=False))

def downgrade():
    for table in ['inference_logs','feedback_events','model_versions','time_entries','tracking_events','invoices','documents','transports','users']:
        op.drop_table(table)
