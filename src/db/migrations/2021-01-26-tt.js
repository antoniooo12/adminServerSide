// export
async function up(queryInterface, {DataTypes}) {
    await queryInterface.addColumn('users', 'telegram', {
        type: DataTypes.STRING(255), allowNull: true, defaultValue: ''
    });
}

// export
async function down(queryInterface) {
    await queryInterface.removeColumn('users', 'telegram');
}

module.exports = {up, down}