"""Adjust country and phone columns to be nullable

Revision ID: 65f12ee40cd7
Revises: 5317baa76837
Create Date: 2024-11-14 20:23:20.899861

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '65f12ee40cd7'
down_revision: Union[str, None] = '5317baa76837'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('company', 'country',
               existing_type=sa.VARCHAR(),
               nullable=True,
               schema='colauncha_web')
    op.alter_column('company', 'phone',
               existing_type=sa.VARCHAR(),
               nullable=True,
               schema='colauncha_web')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('company', 'phone',
               existing_type=sa.VARCHAR(),
               nullable=False,
               schema='colauncha_web')
    op.alter_column('company', 'country',
               existing_type=sa.VARCHAR(),
               nullable=False,
               schema='colauncha_web')
    # ### end Alembic commands ###